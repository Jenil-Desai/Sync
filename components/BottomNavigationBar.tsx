import Icon from 'react-native-vector-icons/FontAwesome6';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function BottomNavigationBar() {
  return (
    <View style={styles.container}>
      <Icon name="house" size={20} />
      <TouchableOpacity style={styles.newContainer}>
        <Icon name="plus" size={20} color={'#fff'} />
        <Text style={styles.newChatText}>New Chat</Text>
      </TouchableOpacity>
      <Icon name="user" size={20} />
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
  newContainer: {
    width: 200,
    height: 35,
    borderRadius: 30,
    gap: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatText: {
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 17,
  },
});
