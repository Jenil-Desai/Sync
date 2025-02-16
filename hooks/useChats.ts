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

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select("*, user1Details:user1 (*), user2Details:user2 (*)")
          .eq("id", chatId)
          .single();

        if (error || !data) {
          setState({ chat: null, loading: true });
          return;
        }

        setState({
          chat: data as ChatData,
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
        const { data, error } = await supabase
          .from("chats")
          .select("*, user1Details:user1 (*), user2Details:user2 (*)")
          .or(`user1.eq.${user.id},user2.eq.${user.id}`);

        setState({
          chats: error ? [] : (data as ChatData[]),
          loading: false,
        });
      } catch (error) {
        setState({ chats: [], loading: false });
      }
    };

    fetchChats();
  }, [user]);

  return state;
};
