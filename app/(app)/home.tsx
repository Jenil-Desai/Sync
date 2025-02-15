import ChatListItem from "@/components/ChatListItem";
import Header from "@/components/Header";
import Moment from "@/components/Moment";
import { dummyChats } from "@/constants/Chats";
import { supabase } from "@/libs/supabase";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const { data: currentUser } = await supabase.auth.getUser();

    if (currentUser.user) {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .or(`user1.eq.${currentUser.user.id},user2.eq.${currentUser.user.id}`);

      if (!error) setChats(data);
    }
  };

  return (
    <View className="flex-1 flex-grow">
      <Header
        title={"Sync"}
        titleStyle={"font-bold text-3xl"}
        icon={"magnifier"}
        iconSize={24}
      />

      <View className="flex flex-row justify-start items-center">
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dummyChats}
          renderItem={({ item }) => (
            <Moment profilePhoto={item.profilePhoto} userName={item.name} />
          )}
          keyExtractor={(item) => item.profilePhoto + Math.random().toString()}
          ListHeaderComponent={
            <TouchableOpacity className="mb-10 pr-2 pl-4">
              <View className="w-21 h-21 p-8 rounded-full border-2 border-slate-200 border-dashed flex flex-row justify-center items-center">
                <SimpleLineIcons name="plus" size={20} color={"gray"} />
              </View>
              <Text className="text-center">Moment</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <Header
        title={"Chats"}
        titleStyle={"font-medium text-2xl"}
        icon={"options"}
        iconSize={24}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        renderItem={({ item }) => (
          <ChatListItem
            name={item.name}
            profilePhoto={"https://i.pravatar.cc/300"}
            lastmsg={"item.lastmsg"}
            msgCount={Math.floor(Math.random() * 11)}
          />
        )}
        keyExtractor={(item) => item.profilePhoto + Math.random().toString()}
      />
    </View>
  );
}
