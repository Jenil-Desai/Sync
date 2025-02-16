import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MomentProps {
  profilePhoto: string;
  userName: string;
}

export default function Moment({ profilePhoto, userName }: MomentProps) {
  return (
    <TouchableOpacity className="px-2 mb-10">
      <View className="w-21 h-21 p-1 rounded-full border-2 flex flex-row justify-center items-center border-custom-lavendar-medium">
        <Image
          source={{ uri: profilePhoto }}
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-center">{userName.split(" ")[0]}</Text>
    </TouchableOpacity>
  );
}
