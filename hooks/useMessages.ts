import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import { IMessage } from "react-native-gifted-chat";

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
            })),
        loading: false,
      });
    } catch (error) {
      setState({ messages: [], loading: false });
    }
  };

  useEffect(() => {
    fetchMessages();

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
        (payload) => {
          if (payload.eventType === "INSERT") {
            setState((prevState) => ({
              messages: [
                {
                  _id: payload.new.id,
                  text: payload.new.message,
                  createdAt: new Date(payload.new.created_at),
                  user: {
                    _id: payload.new.sender_id,
                    name: payload.new.sender.fullname,
                    avatar: payload.new.sender.profile_photo_url,
                  },
                },
                ...prevState.messages,
              ],
              loading: false,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  const onSend = async (newMessages: IMessage[] = []) => {
    if (!newMessages.length || !newMessages[0].text.trim()) return;

    try {
      const message = newMessages[0];
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            chat_id: chatId,
            sender_id: message.user._id,
            message: message.text,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { ...state, onSend };
};
