import { StyleSheet, View, Text, Alert } from "react-native";
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
import * as Clipboard from "expo-clipboard";
import { supabase } from "@/libs/supabase";

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { loading: chatLoading, chat } = useChat(chatId as string);
  const { user: currentUser, loading: userLoading } = useUser();
  const {
    messages,
    loading: messagesLoading,
    onSend,
    markAsSeen,
    setState, // Add setState to update local state
  } = useMessages(chatId as string);

  useEffect(() => {
    if (!chatLoading && !userLoading && !messagesLoading) {
      markAsSeen();
      cleanupOldMessages();
    }
  }, [chatLoading, userLoading, messagesLoading]);

  if (chatLoading || userLoading || messagesLoading) {
    return (
      <View className="flex-1 bg-white">
        <ChatScreenHeader
          name={"Loading..."}
          profilePhotoUrl={"https://avatar.iran.liara.run/public"}
          status={"online"}
        />
        <View className="flex-1 justify-center items-center animate-spin">
          <SimpleLineIcons
            name="refresh"
            size={24}
            color={Colors.MD_LAVENDAR}
          />
        </View>
      </View>
    );
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
        onLongPress={(context: any, message: IMessage) => {
          const options = ["Copy Text", "Delete", "Cancel"];
          const cancelButtonIndex = options.length - 1;
          context.actionSheet().showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex: number) => {
              switch (buttonIndex) {
                case 0:
                  await Clipboard.setStringAsync(message.text);
                  break;

                case 1:
                  Alert.alert(
                    "Delete Message",
                    "Are you sure you want to delete this message?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                          try {
                            console.log("Message : ", message);
                            const response = await supabase
                              .from("messages")
                              .delete()
                              .eq("id", message._id);
                            console.log("Response : ", response);
                            setState((prevState) => ({
                              messages: prevState.messages.filter(
                                (msg) => msg._id !== message._id
                              ),
                              loading: false,
                            }));
                          } catch (error) {
                            console.error("Error deleting message:", error);
                          }
                        },
                      },
                    ]
                  );
                  break;
              }
            }
          );
        }}
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
