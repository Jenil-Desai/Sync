import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Chat} from '../data/chats';
import moment from 'moment';

export default function ChatListItem(chat: Chat) {
  return (
    <View style={styles.container}>
      <Image source={{uri: chat.profilePhoto}} style={styles.profileImage} />
      <View style={styles.chatDetails}>
        <View style={styles.primaryDetails}>
          <Text style={styles.userName}>{chat.name}</Text>
          <Text style={styles.msgTime}>
            {moment(chat.lastmsgTime).format('HH:MM A').toString()}
          </Text>
        </View>
        <View style={styles.secondaryDetails}>
          <Text>{chat.lastmsg.slice(0, 40) + '...'}</Text>
          <Text style={styles.msgCount}>1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: 500,
  },
  msgTime: {
    fontSize: 10,
    fontWeight: 500,
    opacity: 0.5,
  },
  secondaryDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  msgCount: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FDC604',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});
