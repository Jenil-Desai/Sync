import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SettingsScreenHeader from "@/components/headers/settingsScreenHeader";
import { supabase } from "@/libs/supabase";
import { User } from "@supabase/supabase-js";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Settings() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  async function handleLogOutBtn() {
    await supabase.auth.signOut();
  }

  if (loading) return <Text>Loading</Text>;

  return (
    <View className="flex-1">
      <SettingsScreenHeader />
      <View className="p-6">
        <View className="bg-slate-200 rounded-lg p-4 flex flex-row justify-start items-center gap-2 mb-10">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public" }}
            className="rounded-full mr-2"
            style={{ width: 80, height: 80 }}
          />
          <View className="flex justify-center items-start gap-1">
            <Text className="text-xl font-semibold">Jenil Desai</Text>
            <Text className="font-normal opacity-50 text-md">
              {user?.email}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="bg-slate-200 rounded-lg p-4 flex flex-row justify-between items-center mb-2">
          <View className="flex flex-row justify-between items-center gap-5">
            <SimpleLineIcons name="user" size={20} />
            <Text className="text-xl font-semibold">Change Details</Text>
          </View>
          <SimpleLineIcons name="arrow-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-slate-200 rounded-lg p-4 flex flex-row justify-between items-center mb-10">
          <View className="flex flex-row justify-between items-center gap-5">
            <SimpleLineIcons name="info" size={20} />
            <Text className="text-xl font-semibold">About App</Text>
          </View>
          <Text className="text-xl font-semibold text-slate-500">v5.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-slate-200 rounded-lg p-4 flex flex-row justify-center items-center"
          onPress={handleLogOutBtn}
        >
          <View className="flex flex-row justify-center items-center gap-3">
            <SimpleLineIcons
              name="logout"
              size={20}
              className="text-xl font-semibold text-slate-500"
            />
            <Text className="text-xl font-semibold text-slate-500">
              Log Out{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
