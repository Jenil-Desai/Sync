import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatScreenHeader from "@/components/headers/chatScreenHeader";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChats";
import { useUser } from "@/hooks/useUser";
import { useMessages } from "@/hooks/useMessages";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

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
  const [isTyping, setIsTyping] = React.useState(false);

  useEffect(() => {
    if (!chatLoading && !userLoading && !messagesLoading) {
      markAsSeen();
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

  // Add this function to handle typing indicator
  const handleInputTextChanged = (text: string) => {
    if (text.length > 0) {
      // Emit typing event to your backend
      // supabase.channel('typing').send({
      //   type: 'broadcast',
      //   event: 'typing',
      //   payload: { chatId, userId: currentUser.id }
      // });
    }
  };

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
        isTyping={isTyping}
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
                  {message.sent && (
                    <Ionicons name="checkmark" size={14} color={"gray"} />
                  )}
                  {message.received && (
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
        onInputTextChanged={handleInputTextChanged}
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
