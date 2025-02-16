import ChatListItem from "@/components/ChatListItem";
import Header from "@/components/headers/Header";
import Moment from "@/components/Moment";
import { dummyChats } from "@/constants/Chats";
import { useChats } from "@/hooks/useChats";
import { useUser } from "@/hooks/useUser";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { user: currentUser, loading: currentUserLoading } = useUser();
  const { chats, loading: chatsLoading } = useChats();

  if (currentUserLoading || chatsLoading) {
    return <Text>Loading...</Text>;
  }

  console.log("chats", chats);

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
            id={item.id}
            name={
              item.user1 === currentUser?.id
                ? item.user2Details.fullname
                : item.user1Details.fullname
            }
            profilePhoto={
              item.user1 === currentUser?.id
                ? item.user2Details.profile_photo_url
                : item.user1Details.profile_photo_url
            }
            lastmsg={"Last Message"}
            msgCount={Math.floor(Math.random() * 11)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
