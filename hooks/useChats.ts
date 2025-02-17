import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

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

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) {
        setState({ chats: [], loading: false });
        return;
      }

      try {
        const { data: chatsData, error: chatsError } = await supabase
          .from("chats")
          .select("*, user1Details:user1 (*), user2Details:user2 (*)")
          .or(`user1.eq.${user.id},user2.eq.${user.id}`);

        if (chatsError || !chatsData) {
          setState({ chats: [], loading: false });
          return;
        }

        // Fetch last messages and unseen counts for all chats
        const enhancedChats = await Promise.all(
          chatsData.map(async (chat) => {
            const { data: messageData } = await supabase
              .from("messages")
              .select("message, created_at")
              .eq("chat_id", chat.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .single();

            const { count } = await supabase
              .from("messages")
              .select("id", { count: "exact", head: true })
              .eq("chat_id", chat.id)
              .eq("seen", false)
              .neq("sender_id", user.id);

            return {
              ...chat,
              lastMessage: messageData,
              unseenCount: count || 0,
            };
          })
        );

        setState({
          chats: enhancedChats as ChatData[],
          loading: false,
        });
      } catch (error) {
        setState({ chats: [], loading: false });
      }
    };

    fetchChats();

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

    // Subscribe to new messages
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

          // Update the specific chat with new message
          setState((prevState) => {
            const updatedChats = prevState.chats.map((chat) => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  lastMessage: {
                    message: payload.new.message,
                    created_at: payload.new.created_at,
                  },
                  unseenCount:
                    chat.unseenCount +
                    (payload.new.sender_id !== user?.id ? 1 : 0),
                } as ChatData;
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
      chatsSubscription.unsubscribe();
      messagesSubscription.unsubscribe();
      seenSubscription.unsubscribe();
    };
  }, [user]);

  return state;
};
