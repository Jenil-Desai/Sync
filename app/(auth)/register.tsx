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

export const DEFAULT_AVATAR_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user_profile_photos/default-avatar.png`;

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

  function backBtn() {
    router.back();
  }

  function handleFullNameChange(value: string) {
    setFullName(value);
  }

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  // Update the signInBtn function
  async function signInBtn() {
    setLoading(true);

    try {
      // Input validation
      if (!fullName.trim()) {
        throw new Error("Name Is Required");
      }

      if (!email.trim()) {
        throw new Error("Email Is Required");
      }

      if (password.length < 8) {
        throw new Error("Password Should Be Atleast 8 Character Long");
      }

      // Sign up with Supabase Auth including metadata
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            profile_photo: "default-avatar.png",
            profile_photo_url: DEFAULT_AVATAR_URL,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("User creation failed");

      router.replace("/(app)/home");
    } catch (error: any) {
      Alert.alert(
        "Registration Error",
        error.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
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
          <Text className="text-left font-bold text-4xl">Create Account</Text>
          <Text className="text-left text-gray-500 font-semibold">
            Begin step towards connection
          </Text>
        </View>
        <View className="gap-3 mb-14">
          <View>
            <Text className="mb-1 text-slate-800 font-semibold text-lg">
              Full Name
            </Text>
            <TextInput
              style={styles.inputField}
              className="w-full bg-custom-lavendar-light px-3 rounded-lg text-lg font-semibold text-black"
              placeholder="Enter your full name"
              placeholderTextColor={"black"}
              onChangeText={handleFullNameChange}
              value={fullName}
              editable={!loading}
            />
          </View>
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
          <View>
            <Text className="mb-1 text-slate-800 font-semibold text-lg">
              Password
            </Text>
            <TextInput
              style={styles.inputField}
              className="w-full bg-custom-lavendar-light px-3 rounded-lg text-lg font-semibold text-black"
              placeholder="Enter your password"
              placeholderTextColor={"black"}
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
            className="bg-custom-lavendar-dark px-28 py-5 rounded-lg"
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
