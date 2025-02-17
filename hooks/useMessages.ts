import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import { IMessage } from "react-native-gifted-chat";
import { useUser } from "./useUser"; // Add this import

export const useMessages = (chatId: string) => {
  type LoadingState = {
    messages: never[];
    loading: true;
  };

  type LoadedState = {
    messages: IMessage[];
    loading: false;
  };

  type MessagesState = LoadingState | LoadedState;

  const [state, setState] = useState<MessagesState>({
    messages: [],
    loading: true,
  });

  const { user } = useUser(); // Add this hook

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          *,
          sender:sender_id (
            id,
            fullname,
            profile_photo_url
          )
        `
        )
        .eq("chat_id", chatId)
        .order("created_at", { ascending: false });

      setState({
        messages: error
          ? []
          : data.map((msg) => ({
              _id: msg.id,
              text: msg.message,
              createdAt: new Date(msg.created_at),
              user: {
                _id: msg.sender.id,
                name: msg.sender.fullname,
                avatar: msg.sender.profile_photo_url,
              },
              seen: msg.seen,
            })),
        loading: false,
      });
    } catch (error) {
      setState({ messages: [], loading: false });
    }
  };

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

  useEffect(() => {
    let isActive = true;

    const initializeChat = async () => {
      if (!chatId || !user) return;

      await fetchMessages();
      if (isActive) {
        await markAsSeen();
      }
    };

    initializeChat();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        async (payload) => {
          if (!isActive) return;

          if (payload.eventType === "INSERT") {
            // Only add message if it's from another user
            if (payload.new.sender_id !== user?.id) {
              const { data: senderData } = await supabase
                .from("users")
                .select("id, fullname, profile_photo_url")
                .eq("id", payload.new.sender_id)
                .single();

              setState((prevState) => ({
                messages: [
                  {
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
                  },
                  ...prevState.messages.filter(
                    (msg) => msg._id !== payload.new.id
                  ),
                ],
                loading: false,
              }));

              // Mark message as seen if it's from other user
              await markAsSeen();
            }
          }
        }
      )
      .subscribe();

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [chatId, user]);

  const onSend = async (newMessages: IMessage[] = []) => {
    if (!newMessages.length || !newMessages[0].text.trim()) return;

    const message = newMessages[0];
    const tempId = message._id; // Store temporary ID for later reference
    try {
      // Update local state immediately for optimistic update
      setState((prevState) => ({
        messages: [
          {
            ...message,
            pending: true, // Add pending state
            sent: false,
            received: false,
            seen: false,
          },
          ...prevState.messages,
        ],
        loading: false,
      }));

      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            chat_id: chatId,
            sender_id: message.user._id,
            message: message.text,
            created_at: new Date().toISOString(),
            seen: false,
          },
        ])
        .select("*, sender:sender_id (*)")
        .single();

      if (error) {
        console.error("Error sending message:", error);
        // Remove failed message from state
        setState((prevState) => ({
          messages: prevState.messages.filter((msg) => msg._id !== tempId),
          loading: false,
        }));
        return;
      }

      // Replace optimistic message with actual message
      setState((prevState) => ({
        messages: prevState.messages.map((msg) =>
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
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove failed message from state
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
  };
};
