import Header from "@/components/Header";
import { Text, SafeAreaView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <Header title={"Sync"} titleStyle={"font-bold text-3xl"} icon={"search"} iconSize={24} />
    </SafeAreaView>
  );
}
