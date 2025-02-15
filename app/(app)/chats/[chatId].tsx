import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatScreenHeader from "@/components/headers/chatScreenHeader";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { supabase } from "@/libs/supabase";
import { Text } from "react-native";

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetchMessages();
    getUser();

    const subscription = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.chat_id === chatId) {
            const formattedMessage = {
              _id: payload.new.id,
              text: payload.new.message,
              createdAt: new Date(payload.new.created_at),
              user: {
                _id: payload.new.sender_id,
              },
            };
            setMessages((prev) => GiftedChat.append(prev, [formattedMessage]));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error) setUserId(data?.user?.id);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const formattedMessages = data.map((msg) => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender_id,
          name: "User",
        },
      }));

      setMessages(formattedMessages);
    }
  };

  const onSend = async (newMessages: IMessage[] = []) => {
    if (!newMessages.length || !newMessages[0].text.trim()) return;

    const message: IMessage = newMessages[0];

    await supabase.from("messages").insert([
      {
        chat_id: chatId,
        sender_id: userId,
        message: message.text,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white text-slate-200">
      <ChatScreenHeader />
      {userId ? (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: userId }}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: styles.senderBubble,
                left: styles.receiverBubble,
              }}
              textStyle={{
                right: styles.senderText,
                left: styles.receiverText,
              }}
            />
          )}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  senderBubble: {
    backgroundColor: "#facc15",
  },
  receiverBubble: {
    backgroundColor: "#E2E8F0",
  },
  senderText: {
    color: "#000",
  },
  receiverText: {
    color: "#000",
  },
});
