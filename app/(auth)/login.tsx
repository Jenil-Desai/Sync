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
import { Link, useRouter } from "expo-router";
import { supabase } from "@/libs/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

  function backBtn() {
    router.back();
  }

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
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

    if (password.length < 8 || !password) {
      setLoading(false);
      return Alert.alert(
        "Error",
        "Password Should Be Atleast 8 Character Long",
        [
          {
            text: "Ok",
            style: "default",
          },
        ]
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      return Alert.alert("Error While Sign In", error.message);
    } else {
      return router.replace("/(app)/home");
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5 bg-white">
        <View className="flex flex-row justify-between items-center mb-14">
          <Ionicons name="arrow-back" size={38} onPress={backBtn} />
          <Ionicons name="help-circle-outline" size={38} />
        </View>
        <View className="mb-14">
          <Text className="text-left font-bold text-4xl">Welcome back!</Text>
          <Text className="text-left text-gray-500 font-semibold">
            Sign in to stay connected
          </Text>
        </View>
        <View className="gap-3 mb-14">
          <View>
            <Text className="mb-1 text-slate-800 font-semibold text-lg">
              Email
            </Text>
            <TextInput
              style={styles.inputField}
              className="w-full bg-slate-600 px-3 rounded-lg text-lg font-semibold text-white"
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              value={email}
              editable={!loading}
            />
          </View>
          <View>
            <Text className="mb-1 text-slate-800 font-semibold text-lg">
              Password
            </Text>
            <TextInput
              style={styles.inputField}
              className="w-full bg-slate-600 px-3 rounded-lg text-lg font-semibold text-white"
              placeholder="Enter your password"
              placeholderTextColor={"white"}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              value={password}
              editable={!loading}
            />
          </View>
        </View>
        <View>
          <Link href={"/"} disabled={loading}>
            <Text className="text-right font-semibold text-lg text-slate-800 mb-2">
              Forgot Password ?
            </Text>
          </Link>
          <TouchableOpacity
            className="bg-black px-28 py-5 rounded-lg"
            onPress={signInBtn}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
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
