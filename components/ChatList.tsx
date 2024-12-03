import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {chats} from '../data/chats';
import ChatListItem from './ChatListItem';
import Headers from './Headers';

export default function ChatList() {
  return (
    <View>
      <Headers
        headerText="Chats"
        headerTextStyle={{fontWeight: 400, fontSize: 20}}
        iconName="ellipsis-h"
        iconStyle={{color: '#000', fontSize: 20}}
      />
      {chats.map((chat, idx) => (
        <ChatListItem
          key={idx}
          name={chat.name}
          profilePhoto={chat.profilePhoto}
          lastmsg={chat.lastmsg}
          lastmsgTime={chat.lastmsgTime}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
