import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MomentItem from './MomentItem';
import {chats} from '../data/chats';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useIsDarkMode} from '../utils/useDarkMode';

export default function MomentsList() {
  const isDarkMode = useIsDarkMode();
  return (
    <ScrollView
      style={styles.momentListContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.newMomentContainer}>
        <View
          style={
            isDarkMode
              ? styles.darkNewMomentButton
              : styles.lightNewMomentButton
          }>
          <Icon name="plus" size={20} color={isDarkMode ? '#FFF' : '#000'} />
        </View>
        <Text
          style={
            isDarkMode ? styles.darkNewMomentText : styles.lightNewMomentText
          }>
          Moment
        </Text>
      </View>
      {chats.map((chat, idx) => (
        <MomentItem
          profilePhoto={
            chat.profilePhoto ??
            `https://avatar.iran.liara.run/public/?username=[${chat.name}]`
          }
          userName={chat.name}
          key={idx}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  momentListContainer: {
    marginBottom: 10,
  },
  newMomentContainer: {
    padding: 10,
  },
  lightNewMomentButton: {
    width: 60,
    height: 60,
    padding: 10,
    borderWidth: 2,
    borderRadius: 60 / 2,
    borderStyle: 'dashed',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderColor: '#000',
  },
  darkNewMomentButton: {
    width: 60,
    height: 60,
    padding: 10,
    borderWidth: 2,
    borderRadius: 60 / 2,
    borderStyle: 'dashed',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderColor: '#FFF',
  },
  lightNewMomentText: {
    color: '#000',
    textAlign: 'center',
  },
  darkNewMomentText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
