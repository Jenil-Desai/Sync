import { Slot, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";

import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import MenuModal from "@/components/MenuModal";
import { supabase } from "@/libs/supabase";
import { User } from "@supabase/supabase-js";

export default function RootLayout() {
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

      if (!user) {
        router.replace("/(auth)/login");
      }
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (!session?.user) {
          router.replace("/(auth)/login");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Text className="text-center">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title={"Sync"}
        titleStyle={"font-bold text-3xl"}
        icon={"magnifier"}
        iconSize={24}
      />
      <Slot />
      <MenuModal />
      <BottomNavigationBar />
    </SafeAreaView>
  );
}
