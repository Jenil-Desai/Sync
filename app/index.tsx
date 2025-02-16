import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "@/libs/supabase";
import { User } from "@supabase/supabase-js";
import { Colors } from "@/constants/Colors";

export default function WelcomeScreen() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        return router.replace("/(app)/home");
      }
    }

    getUser();
  }, []);

  function createAccountBtn() {
    router.push("/(auth)/register");
  }

  function signInBtn() {
    router.push("/(auth)/login");
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Text className="text-center">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex justify-evenly items-center bg-white">
      <View className="bg-custom-lavendar-dark p-7 rounded-3xl">
        <Ionicons name="sync" color={"white"} size={58} />
      </View>
      <View>
        <Text className="text-center font-bold text-4xl">Welcome To Sync</Text>
        <Text className="text-center text-gray-500 font-semibold">
          Stay connected, chat seamlessly
        </Text>
      </View>
      <View className="gap-3">
        <TouchableOpacity
          className="bg-custom-lavendar-dark px-28 py-5 rounded-lg"
          onPress={createAccountBtn}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-custom-lavendar-light px-28 py-5 rounded-lg"
          onPress={signInBtn}
        >
          <Text className="text-black text-center font-semibold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
