import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Chat} from '../data/chats';
import moment from 'moment';
import {useIsDarkMode} from '../utils/useDarkMode';

export default function ChatListItem(chat: Chat) {
  const isDarkMode = useIsDarkMode();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            chat.profilePhoto ??
            `https://avatar.iran.liara.run/public/?username=[${chat.name.replace(
              ' ',
              '+',
            )}]`,
        }}
        style={styles.profileImage}
      />
      <View style={styles.chatDetails}>
        <View style={styles.primaryDetails}>
          <Text style={isDarkMode ? styles.darkUserName : styles.lightUserName}>
            {chat.name}
          </Text>
          <Text style={isDarkMode ? styles.darkMsgTime : styles.lightMsgTime}>
            {moment(chat.lastmsgTime).format('HH:MM A').toString()}
          </Text>
        </View>
        <View style={styles.secondaryDetails}>
          {chat.lastmsg && (
            <Text style={{color: isDarkMode ? '#FFF' : '#000'}}>
              {chat.lastmsg.slice(0, 29) + '...'}
            </Text>
          )}
          {chat.lastmsg && (
            <View style={styles.msgCountContainer}>
              <Text style={styles.msgCount}>{chat.msgCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
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
  lightUserName: {
    color: '#000',
    fontSize: 17,
    fontWeight: 500,
  },
  darkUserName: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 500,
  },
  lightMsgTime: {
    color: '#000',
    fontSize: 10,
    fontWeight: 500,
    opacity: 0.5,
  },
  darkMsgTime: {
    color: '#FFF',
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
  msgCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC604',
    width: 40,
    height: 20,
    borderRadius: 20 / 2,
  },
  msgCount: {
    fontSize: 12,
  },
});
