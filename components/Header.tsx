import { SimpleLineIcons } from "@expo/vector-icons";
import { SimpleLineIcons as SimpleLineIconsType } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
  titleStyle: string;
  icon: keyof typeof SimpleLineIconsType.glyphMap;
  iconSize: number;
}

export default function Header({ title, titleStyle, icon, iconSize }: HeaderProps) {
  return (
    <View className="w-[100%] p-5 bg-transparent flex flex-row justify-between items-center">
      <Text className={titleStyle}>{title}</Text>
      <SimpleLineIcons name={icon} size={iconSize} />
    </View>
  );
}
