import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {chats} from '../data/chats';
import ChatListItem from './ChatListItem';
import Headers from './Headers';

const {width, height} = Dimensions.get('screen');

export default function ChatList() {
  return (
    <View>
      <View style={{height: height * 0.06}}>
        <Headers
          headerText="Chats"
          headerTextStyle={{fontWeight: 400, fontSize: 20}}
          iconName="ellipsis"
          iconStyle={{color: '#000', fontSize: 20}}
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
