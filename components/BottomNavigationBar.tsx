import { menuVisibleAtom } from "@/store/atoms";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import React from "react";

export default function BottomNavigationBar() {
  const [menuVisible, setMenuVisible] = useRecoilState(menuVisibleAtom);

  return (
    <View className="h-20 bg-white flex flex-row justify-evenly items-center border-t-[0.2px] border-slate-400">
      <SimpleLineIcons name="home" size={24} />
      <TouchableOpacity className="flex flex-row justify-between items-center gap-2 bg-black px-9 py-2 rounded-full" onPress={() => setMenuVisible(true)}>
        {menuVisible ? (
          <>
            <SimpleLineIcons name="close" color={"white"} size={15} />
            <Text className="text-white">Close</Text>
          </>
        ) : (
          <>
            <SimpleLineIcons name="plus" color={"white"} size={15} />
            <Text className="text-white">New Chat</Text>
          </>
        )}
      </TouchableOpacity>
      <SimpleLineIcons name="user" size={24} />
    </View>
  );
}
