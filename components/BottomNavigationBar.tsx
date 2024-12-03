import Icon from 'react-native-vector-icons/FontAwesome6';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useIsDarkMode} from '../utils/useDarkMode';

export default function BottomNavigationBar() {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = {
    backgroundColor: isDarkMode ? '#212529' : '#FFF',
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <Icon name="house" size={20} color={isDarkMode ? '#FFF' : '#000'} />
      <TouchableOpacity
        style={isDarkMode ? styles.darkNewContainer : styles.lightNewContainer}>
        <Icon name="plus" size={20} color={isDarkMode ? '#FFF' : '#000'} />
        <Text
          style={isDarkMode ? styles.darkNewChatText : styles.lightNewChatText}>
          New Chat
        </Text>
      </TouchableOpacity>
      <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#000'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 70,
  },
  lightNewContainer: {
    width: 200,
    height: 35,
    borderRadius: 30,
    gap: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkNewContainer: {
    width: 200,
    height: 35,
    borderRadius: 30,
    gap: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightNewChatText: {
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 17,
  },
  darkNewChatText: {
    color: '#000',
    fontWeight: 'semibold',
    fontSize: 17,
  },
});
