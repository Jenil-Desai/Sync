import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { menuVisibleAtom } from "@/store/atoms";
import { useRouter } from "expo-router";

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function MenuModal() {
  const [menuVisible, setMenuVisible] = useRecoilState(menuVisibleAtom);
  const marginBottom = Platform.OS === "ios" ? "mb-32" : "mb-24";
  const router = useRouter();

  function handleNewChatBtn() {
    setMenuVisible(false);
    router.push("/(app)/newChat");
  }

  return (
    <Modal
      visible={menuVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setMenuVisible(false)}
    >
      <Pressable
        onPress={() => setMenuVisible(false)}
        className="flex-1 bg-[rgba(0,0,0,0.2)] justify-end"
      >
        <View className={`bg-white m-5 rounded-3xl ${marginBottom}`}>
          <MenuItem
            icon="message-square"
            title="New Chat"
            subtitle="Send a message to your contact"
            onPress={handleNewChatBtn}
          />
          <MenuItem
            icon="user-plus"
            title="New Contact"
            subtitle="Add a contact to be able to send messages"
            onPress={() => {}}
          />
          <MenuItem
            icon="users"
            title="New Community"
            subtitle="Join the community around you"
            onPress={() => {}}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const MenuItem = ({ icon, title, subtitle, onPress }: MenuItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center p-4 border-b-[0.5px] border-b-slate-400"
    onPress={onPress}
  >
    <View className="justify-center items-center w-10 h-10">
      <Feather name={icon} size={24} color="#000" />
    </View>
    <View className="ml-3">
      <Text className="font-semibold text-[15px] pb-1">{title}</Text>
      <Text className="text-[#666] text-sm">{subtitle}</Text>
    </View>
  </TouchableOpacity>
);
