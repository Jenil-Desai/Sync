import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatScreenHeader from "@/components/headers/chatScreenHeader";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChats";
import { useUser } from "@/hooks/useUser";
import { useMessages } from "@/hooks/useMessages";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { cleanupOldMessages } from "@/utils/offileCache";

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { loading: chatLoading, chat } = useChat(chatId as string);
  const { user: currentUser, loading: userLoading } = useUser();
  const {
    messages,
    loading: messagesLoading,
    onSend,
    markAsSeen,
  } = useMessages(chatId as string);

  useEffect(() => {
    if (!chatLoading && !userLoading && !messagesLoading) {
      markAsSeen();
      cleanupOldMessages();
    }
  }, [chatLoading, userLoading, messagesLoading]);

  if (chatLoading || userLoading || messagesLoading) {
    return <Text>Loading...</Text>;
  }

  if (!chat || !currentUser) {
    return <Text>Error loading chat</Text>;
  }

  const otherUser =
    chat.user1 === currentUser.id ? chat.user2Details : chat.user1Details;

  return (
    <View className="flex-1 bg-white">
      <ChatScreenHeader
        name={otherUser.fullname}
        profilePhotoUrl={otherUser.profile_photo_url}
        status={"online"} // Adjust this if you have online status tracking
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
            renderTicks={(message: IMessage) => {
              if (message.user._id !== currentUser.id) {
                return null;
              }
              return (
                <View style={styles.tickContainer}>
                  {message.sent && !message.received && (
                    <Ionicons name="checkmark" size={14} color={"gray"} />
                  )}
                  {message.received && !message.seen && (
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name="checkmark-done"
                        size={14}
                        color={"gray"}
                      />
                    </View>
                  )}
                  {message.seen && (
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name="checkmark-done"
                        size={14}
                        color="#4C9EEB"
                        style={{ marginLeft: -8 }}
                      />
                    </View>
                  )}
                </View>
              );
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
  tickContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginBottom: 5,
  },
  tick: {
    fontSize: 10,
    color: "green",
    marginLeft: 2,
  },
  tickSeen: {
    color: Colors.MD_LAVENDAR,
  },
  typingContainer: {
    padding: 8,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 10,
  },
  typingText: {
    color: "#999",
    fontSize: 12,
    fontStyle: "italic",
  },
});
