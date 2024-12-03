import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useIsDarkMode} from '../utils/useDarkMode';

interface MomentItemProps {
  profilePhoto: string;
  userName: string;
}

export default function MomentItem({profilePhoto, userName}: MomentItemProps) {
  const isDarkMode = useIsDarkMode();

  return (
    <View style={styles.container}>
      <Image source={{uri: profilePhoto}} style={styles.profilePhoto} />
      <Text style={isDarkMode ? styles.darkUserName : styles.lightUserName}>
        {userName.split(' ')[0]}
      </Text>
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
  lightUserName: {
    color: '#000',
    textAlign: 'center',
  },
  darkUserName: {
    color: '#fff',
    textAlign: 'center',
  },
});
