import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeadersProps {
  headerText: string;
  headerTextStyle: TextStyle;
  iconName: string;
  iconStyle: TextStyle;
}

export default function Headers({
  headerText,
  headerTextStyle,
  iconName,
  iconStyle,
}: HeadersProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={headerTextStyle}>{headerText}</Text>
      <Icon name={iconName} style={iconStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
