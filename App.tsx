import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import Headers from './components/Headers';
import ChatList from './components/ChatList';
import MomentsList from './components/MomentsList';
import BottomNavigationBar from './components/BottomNavigationBar';

const {width, height} = Dimensions.get('window');

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Headers
            headerText="Sync"
            headerTextStyle={styles.headerText}
            iconName="magnifying-glass"
            iconStyle={styles.headerIcon}
          />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <MomentsList />
            <ChatList />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottomNavContainer}>
        <BottomNavigationBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.08,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  headerIcon: {
    fontSize: 24,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  bottomNavContainer: {
    height: height * 0.1,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
});

export default App;
