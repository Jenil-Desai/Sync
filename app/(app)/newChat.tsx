import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "@/libs/supabase";
import { createChat } from "@/utils/supabaseFunctions";

export default function NewChatScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function backBtn() {
    router.back();
  }

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  async function signInBtn() {
    setLoading(true);
    if (email.length <= 0 || !email) {
      setLoading(false);
      return Alert.alert("Error", "Email Is Required", [
        {
          text: "Ok",
          style: "default",
        },
      ]);
    }

    const { data: existingUser, error: chatError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (chatError) {
      setLoading(false);
      return Alert.alert("Error", chatError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
    }

    const { chat, error } = await createChat(existingUser.id);

    if (error) {
      setLoading(false);
      console.log(error);
      return Alert.alert("Error", "Error While Creating Chat", [
        {
          text: "Ok",
          style: "default",
        },
      ]);
    }

    router.replace(`/(app)/chats/${chat.id}`);

    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5 bg-white">
        <View className="flex flex-row justify-between items-center mb-14">
          <Ionicons name="arrow-back" size={38} onPress={backBtn} />
          <Ionicons name="help-circle-outline" size={38} />
        </View>
        <View className="mb-14">
          <Text className="text-left font-bold text-4xl">New Chat!</Text>
          <Text className="text-left text-gray-500 font-semibold">
            Connect With Family & Friends
          </Text>
        </View>
        <View className="gap-3 mb-14">
          <View>
            <Text className="mb-1 text-slate-800 font-semibold text-lg">
              Email
            </Text>
            <TextInput
              style={styles.inputField}
              className="w-full bg-custom-lavendar-light px-3 rounded-lg text-lg font-semibold text-black"
              placeholder="Enter your email"
              placeholderTextColor={"black"}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              value={email}
              editable={!loading}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="bg-custom-lavendar-dark px-28 py-5 rounded-lg"
            onPress={signInBtn}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    height: 60,
  },
});
