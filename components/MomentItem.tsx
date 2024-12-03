import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface MomentItemProps {
  profilePhoto: string;
  userName: string;
}

export default function MomentItem({profilePhoto, userName}: MomentItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
      <Text style={styles.userName}>{userName.split(' ')[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginBottom: 5,
  },
  userName: {
    textAlign: 'center',
  },
});
