import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Headers from './Headers';

export default function ChatListItem() {
  return (
    <View>
      <Headers
        headerText="Chats"
        headerTextStyle={{fontWeight: 400, fontSize: 20}}
        iconName="ellipsis-h"
        iconStyle={{color: '#000', fontSize: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
