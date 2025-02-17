import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import { IMessage } from "react-native-gifted-chat";
import { useUser } from "./useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const CACHE_KEY_MESSAGES_PREFIX = "cached_messages_";

export const useMessages = (chatId: string) => {
  const [state, setState] = useState({
    messages: [] as IMessage[],
    loading: true,
  });
  const [isOnline, setIsOnline] = useState(true);
  const { user } = useUser();

  // Cache management functions
  const cacheMessages = async (messages: IMessage[]) => {
    try {
      await AsyncStorage.setItem(
        `${CACHE_KEY_MESSAGES_PREFIX}${chatId}`,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error("Error caching messages:", error);
    }
  };

  const getCachedMessages = async (): Promise<IMessage[]> => {
    try {
      const cached = await AsyncStorage.getItem(
        `${CACHE_KEY_MESSAGES_PREFIX}${chatId}`
      );
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.error("Error getting cached messages:", error);
      return [];
    }
  };

  // Modified fetchMessages function
  const fetchMessages = async () => {
    if (!chatId || !user) return;

    try {
      // First load from cache
      const cachedMessages = await getCachedMessages();
      if (cachedMessages.length > 0) {
        setState({
          messages: cachedMessages,
          loading: false,
        });
      }

      // Only fetch from network if online
      if (isOnline) {
        const { data, error } = await supabase
          .from("messages")
          .select("*, sender:sender_id (*)")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedMessages = data.map((msg) => ({
          _id: msg.id,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.sender.id,
            name: msg.sender.fullname,
            avatar: msg.sender.profile_photo_url,
          },
          sent: true,
          received: true,
          seen: msg.seen,
        }));

        // Update cache with fresh data
        await cacheMessages(formattedMessages);

        setState({
          messages: formattedMessages,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Modified useEffect for realtime updates
  useEffect(() => {
    let isActive = true;

    // Monitor network connectivity
    const netInfoUnsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });

    fetchMessages();

    // Only set up subscriptions if online
    if (isOnline) {
      const messagesSubscription = supabase
        .channel(`messages:${chatId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `chat_id=eq.${chatId}`,
          },
          async (payload) => {
            if (!isActive) return;

            // Skip if message is from current user to prevent double rendering
            if (payload.new.sender_id === user?.id) return;

            const isDuplicate = state.messages.some(
              (msg) => msg._id === payload.new.id
            );
            if (isDuplicate) return;

            const { data: senderData } = await supabase
              .from("users")
              .select("id, fullname, profile_photo_url")
              .eq("id", payload.new.sender_id)
              .single();

            const newMessage: IMessage = {
              _id: payload.new.id,
              text: payload.new.message,
              createdAt: new Date(payload.new.created_at),
              user: {
                _id: payload.new.sender_id,
                name: senderData?.fullname || "",
                avatar: senderData?.profile_photo_url || "",
              },
              sent: true,
              received: true,
              seen: payload.new.seen,
            };

            setState((prev) => {
              const updatedMessages = [newMessage, ...prev.messages];
              // Update cache with new message
              cacheMessages(updatedMessages);
              return {
                messages: updatedMessages,
                loading: false,
              };
            });

            if (payload.new.sender_id !== user?.id) {
              await markAsSeen();
            }
          }
        )
        .subscribe();

      const messageUpdatesSubscription = supabase
        .channel(`message_updates:${chatId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "messages",
            filter: `chat_id=eq.${chatId}`,
          },
          (payload) => {
            if (!isActive) return;

            setState((prev) => {
              const updatedMessages = prev.messages.map((msg) =>
                msg._id === payload.new.id
                  ? { ...msg, seen: payload.new.seen }
                  : msg
              );
              // Update cache with updated message
              cacheMessages(updatedMessages);
              return {
                messages: updatedMessages,
                loading: false,
              };
            });
          }
        )
        .subscribe();

      return () => {
        isActive = false;
        netInfoUnsubscribe();
        messagesSubscription.unsubscribe();
        messageUpdatesSubscription.unsubscribe();
      };
    }

    return () => {
      netInfoUnsubscribe();
    };
  }, [chatId, user, isOnline]);

  // Add debounced markAsSeen function
  const markAsSeen = async () => {
    if (!user || !chatId) return;

    try {
      // First update local state for immediate feedback
      setState((prevState) => ({
        messages: prevState.messages.map((msg) => ({
          ...msg,
          seen: msg.user._id !== user.id ? true : msg.seen,
        })),
        loading: false,
      }));

      // Then update database
      const { error } = await supabase
        .from("messages")
        .update({ seen: true })
        .eq("chat_id", chatId)
        .eq("seen", false)
        .neq("sender_id", user.id);

      if (error) {
        console.error("Error marking messages as seen:", error);
        // Revert local state if database update fails
        await fetchMessages();
      }
    } catch (error) {
      console.error("Error marking messages as seen:", error);
      // Revert local state if there's an error
      await fetchMessages();
    }
  };

  // Modified onSend function
  const onSend = async (newMessages: IMessage[] = []) => {
    if (!newMessages.length || !newMessages[0].text.trim()) return;

    const message = newMessages[0];
    const tempId = message._id;

    try {
      // First optimistic update with correct date format
      const optimisticMessage = {
        ...message,
        pending: true,
        sent: false,
        received: false,
        seen: false,
        createdAt: new Date(), // Use actual Date object
      };

      setState((prevState) => {
        const updatedMessages = [optimisticMessage, ...prevState.messages];
        cacheMessages(updatedMessages);
        return {
          messages: updatedMessages,
          loading: false,
        };
      });

      if (!isOnline) {
        const pendingMessage = {
          chatId,
          message: message.text,
          tempId,
          createdAt: new Date().toISOString(), // Fix date format
        };
        await AsyncStorage.setItem(
          `pending_message_${tempId}`,
          JSON.stringify(pendingMessage)
        );
        return;
      }

      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            chat_id: chatId,
            sender_id: message.user._id,
            message: message.text,
            created_at: new Date().toISOString(), // Fix date format
            seen: false,
          },
        ])
        .select("*, sender:sender_id (*)")
        .single();

      if (error) throw error;

      // Update the optimistic message with server data
      setState((prevState) => {
        const updatedMessages = prevState.messages.map((msg) =>
          msg._id === tempId
            ? {
                _id: data.id,
                text: data.message,
                createdAt: new Date(data.created_at),
                user: {
                  _id: data.sender.id,
                  name: data.sender.fullname,
                  avatar: data.sender.profile_photo_url,
                },
                sent: true,
                received: true,
                seen: false,
                pending: false,
              }
            : msg
        );
        cacheMessages(updatedMessages);
        return {
          messages: updatedMessages,
          loading: false,
        };
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setState((prevState) => ({
        messages: prevState.messages.filter((msg) => msg._id !== tempId),
        loading: false,
      }));
    }
  };

  return {
    ...state,
    onSend,
    markAsSeen,
    loading: state.loading,
    isOnline,
  };
};
