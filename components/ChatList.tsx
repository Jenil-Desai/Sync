import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {chats} from '../data/chats';
import ChatListItem from './ChatListItem';
import Headers from './Headers';
import {useIsDarkMode} from '../utils/useDarkMode';

const {width, height} = Dimensions.get('screen');

export default function ChatList() {
  const isDarkMode = useIsDarkMode();
  return (
    <View>
      <View style={{height: height * 0.06}}>
        <Headers
          headerText="Chats"
          headerTextStyle={{
            fontWeight: 400,
            fontSize: 20,
            color: isDarkMode ? '#FFF' : '#000',
          }}
          iconName="ellipsis"
          iconStyle={{
            fontSize: 20,
            color: isDarkMode ? '#FFF' : '#000',
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height: height * 0.6}}>
        {chats.map((chat, idx) => (
          <ChatListItem
            key={idx}
            name={chat.name}
            profilePhoto={chat.profilePhoto}
            lastmsg={chat.lastmsg}
            lastmsgTime={chat.lastmsgTime}
            msgCount={chat.msgCount}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
