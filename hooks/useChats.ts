import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { cacheMessages, getCachedMessages } from "@/utils/offileCache";

export interface ChatData {
  id: string;
  user1: string;
  user2: string;
  user1Details: {
    id: string;
    fullname: string;
    profile_photo: string;
    profile_photo_url: string;
  };
  user2Details: {
    id: string;
    fullname: string;
    profile_photo: string;
    profile_photo_url: string;
  };
  lastMessage: {
    message: string;
    created_at: string;
  } | null;
  unseenCount: number;
}

export const useChat = (chatId: string) => {
  type LoadingState = {
    chat: null;
    loading: true;
  };

  type LoadedState = {
    chat: ChatData;
    loading: false;
  };

  type ChatState = LoadingState | LoadedState;

  const [state, setState] = useState<ChatState>({
    chat: null,
    loading: true,
  });

  const { user } = useUser();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const { data: chatData, error: chatError } = await supabase
          .from("chats")
          .select("*, user1Details:user1 (*), user2Details:user2 (*)")
          .eq("id", chatId)
          .single();

        if (chatError || !chatData) {
          setState({ chat: null, loading: true });
          return;
        }

        // Fetch last message
        const { data: messageData } = await supabase
          .from("messages")
          .select("content, created_at")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        // Fetch unseen messages count
        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("chat_id", chatId)
          .eq("seen", false)
          .neq("sender_id", user?.id);

        setState({
          chat: {
            ...chatData,
            lastMessage: messageData,
            unseenCount: count || 0,
          } as ChatData,
          loading: false,
        });
      } catch (error) {
        setState({ chat: null, loading: true });
      }
    };

    fetchChat();
  }, [chatId]);

  return state;
};

const CACHE_KEY_CHATS = "cached_chats";

export const useChats = () => {
  type LoadingState = {
    chats: never[];
    loading: true;
  };

  type LoadedState = {
    chats: ChatData[];
    loading: false;
  };

  type ChatsState = LoadingState | LoadedState;

  const [state, setState] = useState<ChatsState>({
    chats: [],
    loading: true,
  });
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState(true);

  // Function to cache data
  const cacheData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const fetchChats = async () => {
    if (!user) {
      setState({ chats: [], loading: false });
      return;
    }

    try {
      // Try loading from cache first
      const cachedChats = await AsyncStorage.getItem(CACHE_KEY_CHATS);
      if (cachedChats) {
        setState({
          chats: JSON.parse(cachedChats),
          loading: false,
        });
      }

      // Only fetch from network if online
      if (isOnline) {
        const { data: chatsData, error: chatsError } = await supabase
          .from("chats")
          .select("*, user1Details:user1 (*), user2Details:user2 (*)")
          .or(`user1.eq.${user.id},user2.eq.${user.id}`);

        if (chatsError || !chatsData) return;

        const enhancedChats = await Promise.all(
          chatsData.map(async (chat) => {
            // First check cache for messages
            let cachedMessages = await getCachedMessages(chat.id);
            let lastMessage = cachedMessages[0];

            // If online, fetch latest message and update cache
            if (isOnline) {
              const { data: messageData } = await supabase
                .from("messages")
                .select("message, created_at, sender_id")
                .eq("chat_id", chat.id)
                .order("created_at", { ascending: false })
                .limit(20);

              if (messageData && messageData.length > 0) {
                await cacheMessages(chat.id, messageData);
                lastMessage = messageData[0];
              }
            }

            const { count } = await supabase
              .from("messages")
              .select("id", { count: "exact", head: true })
              .eq("chat_id", chat.id)
              .eq("seen", false)
              .neq("sender_id", user.id);

            return {
              ...chat,
              lastMessage,
              unseenCount: count || 0,
            };
          })
        );

        // Update cache with fresh data
        await AsyncStorage.setItem(
          CACHE_KEY_CHATS,
          JSON.stringify(enhancedChats)
        );

        setState({
          chats: enhancedChats as ChatData[],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    // Monitor network connectivity
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });

    fetchChats();

    // Only set up subscriptions if online
    if (isOnline) {
      // Subscribe to new chats
      const chatsSubscription = supabase
        .channel("chats_channel")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chats",
            filter: `user1.eq.${user?.id}.or.user2.eq.${user?.id}`,
          },
          () => {
            fetchChats(); // Refresh all chats when a new chat is created
          }
        )
        .subscribe();

      // Modify message subscription to cache new messages
      const messagesSubscription = supabase
        .channel("messages_channel")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          async (payload) => {
            const chatId = payload.new.chat_id;

            // Update messages cache
            const cachedMessages = await getCachedMessages(chatId);
            cachedMessages.unshift(payload.new);
            await cacheMessages(chatId, cachedMessages);

            setState((prevState) => {
              const updatedChats = prevState.chats.map((chat) => {
                if (chat.id === chatId) {
                  const updatedChat = {
                    ...chat,
                    lastMessage: {
                      message: payload.new.message,
                      created_at: payload.new.created_at,
                    },
                    unseenCount:
                      chat.unseenCount +
                      (payload.new.sender_id !== user?.id ? 1 : 0),
                  } as ChatData;

                  // Cache the updated chat
                  cacheData(
                    CACHE_KEY_CHATS,
                    prevState.chats.map((c) =>
                      c.id === chatId ? updatedChat : c
                    )
                  );

                  return updatedChat;
                }
                return chat;
              });

              return {
                chats: updatedChats,
                loading: false,
              } as LoadedState;
            });
          }
        )
        .subscribe();

      // Subscribe to message seen status changes
      const seenSubscription = supabase
        .channel("seen_channel")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "messages",
            filter: "seen.eq.true",
          },
          () => {
            fetchChats(); // Refresh all chats when messages are marked as seen
          }
        )
        .subscribe();

      return () => {
        unsubscribe();
        chatsSubscription.unsubscribe();
        messagesSubscription.unsubscribe();
        seenSubscription.unsubscribe();
      };
    }

    return () => {
      unsubscribe();
    };
  }, [user, isOnline]);

  return state;
};
