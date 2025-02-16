import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ChatScreenHeader from "@/components/headers/chatScreenHeader";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChats";
import { useUser } from "@/hooks/useUser";
import { useMessages } from "@/hooks/useMessages";

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { loading: chatLoading, chat } = useChat(chatId as string);
  const { user: currentUser, loading: userLoading } = useUser();
  const {
    messages,
    loading: messagesLoading,
    onSend,
  } = useMessages(chatId as string);

  if (chatLoading || userLoading || messagesLoading) {
    return <Text>Loading...</Text>;
  }

  if (!chat || !currentUser) {
    return <Text>Error loading chat</Text>;
  }

  const otherUser =
    chat.user1 === currentUser.id ? chat.user2Details : chat.user1Details;

  return (
    <View className="flex-1 bg-white text-slate-200">
      <ChatScreenHeader
        name={otherUser.fullname}
        profilePhotoUrl={otherUser.profile_photo_url}
        status={"online"}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: currentUser.id }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  senderBubble: {
    backgroundColor: Colors.MD_LAVENDAR,
  },
  receiverBubble: {
    backgroundColor: Colors.LT_LAVENDAR,
  },
  senderText: {
    color: "#000",
  },
  receiverText: {
    color: "#000",
  },
});
