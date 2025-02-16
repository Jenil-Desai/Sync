import { menuVisibleAtom } from "@/store/atoms";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function BottomNavigationBar() {
  const [menuVisible, setMenuVisible] = useRecoilState(menuVisibleAtom);
  const router = useRouter();

  function handleHomeBtn() {
    router.replace("/(app)/home");
  }

  function handleSettingsBtn() {
    router.push("/(app)/settings");
  }

  return (
    <View className="h-20 bg-white flex flex-row justify-evenly items-center border-t-[0.2px] border-slate-400">
      <TouchableOpacity onPress={handleHomeBtn}>
        <SimpleLineIcons name="home" size={24} color={Colors.DK_LAVENDAR} />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex flex-row justify-between items-center gap-2 bg-custom-lavendar-medium px-9 py-2 rounded-full"
        onPress={() => setMenuVisible(true)}
      >
        {menuVisible ? (
          <>
            <SimpleLineIcons name="close" color={"black"} size={15} />
            <Text className="text-black">Close</Text>
          </>
        ) : (
          <>
            <SimpleLineIcons name="plus" color={"black"} size={15} />
            <Text className="text-black">New Chat</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettingsBtn}>
        <SimpleLineIcons name="settings" size={24} color={Colors.DK_LAVENDAR} />
      </TouchableOpacity>
    </View>
  );
}
