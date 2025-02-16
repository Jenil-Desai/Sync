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
        .select("*")
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
                _id: msg.sender_id,
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

      if (!error && data) {
        // Update local state with the new message
        setState((prevState) => ({
          messages: [
            {
              _id: data.id,
              text: data.message,
              createdAt: new Date(data.created_at),
              user: {
                _id: data.sender_id,
              },
            },
            ...(prevState.loading ? [] : prevState.messages),
          ],
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { ...state, onSend };
};
