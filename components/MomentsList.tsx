import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MomentItem from './MomentItem';
import {chats} from '../data/chats';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function MomentsList() {
  return (
    <ScrollView
      style={styles.momentListContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.newMomentContainer}>
        <View style={styles.newMomentButton}>
          <Icon name="plus" size={20} color={'#000'} />
        </View>
        <Text style={styles.newMomentText}>Moment</Text>
      </View>
      {chats.map((chat, idx) => (
        <MomentItem
          profilePhoto={chat.profilePhoto}
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
  newMomentButton: {
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
  },
  newMomentText: {
    textAlign: 'center',
  },
});
