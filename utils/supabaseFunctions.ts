import { supabase } from "@/libs/supabase";

export const createChat = async (userId: string) => {
  const { data: currentUser, error: userError } = await supabase.auth.getUser();
  if (userError) return { error: userError.message };

  const { data: existingChat, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .or(`user1.eq.${currentUser.user.id},user2.eq.${currentUser.user.id}`)
    .eq("user1", userId)
    .eq("user2", currentUser.user.id)
    .single();

  if (existingChat) return existingChat; // Chat already exists

  const { data: newChat, error } = await supabase
    .from("chats")
    .insert([{ user1: currentUser.user.id, user2: userId }])
    .select()
    .single();

  return { chat: newChat, error };
};

export const fetchMessages = async (chatId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  return { messages: data, error };
};

export const sendMessage = async (chatId: string, message: string) => {
  const { data: currentUser, error: userError } = await supabase.auth.getUser();
  if (userError) return { error: userError.message };
  const { error } = await supabase
    .from("messages")
    .insert([{ chat_id: chatId, sender_id: currentUser.user.id, message }]);

  return { error };
};
