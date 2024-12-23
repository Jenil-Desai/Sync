import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome as FontAwesomeType } from "@expo/vector-icons";
import { StyleProp, Text, TextStyle, View } from "react-native";

interface HeaderProps {
  title: string;
  titleStyle: string;
  icon: keyof typeof FontAwesomeType.glyphMap;
  iconSize: number;
}

export default function Header({ title, titleStyle, icon, iconSize }: HeaderProps) {
  return (
    <View className="w-[100%] p-5 bg-white flex flex-row justify-between items-center">
      <Text className={titleStyle}>{title}</Text>
      <FontAwesome name={icon} size={iconSize} />
    </View>
  );
}
