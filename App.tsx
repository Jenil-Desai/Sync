import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import Headers from './components/Headers';
import ChatList from './components/ChatList';
import MomentsList from './components/MomentsList';
import BottomNavigationBar from './components/BottomNavigationBar';
import {useIsDarkMode} from './utils/useDarkMode';

const {width, height} = Dimensions.get('window');

function App(): React.JSX.Element {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = {
    backgroundColor: isDarkMode ? '#212529' : '#FFF',
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Headers
            headerText="Sync"
            headerTextStyle={
              isDarkMode ? styles.darkHeaderText : styles.lightHeaderText
            }
            iconName="magnifying-glass"
            iconStyle={
              isDarkMode ? styles.darkHeaderIcon : styles.lightHeaderIcon
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <MomentsList />
          </View>
          <View>
            <ChatList />
          </View>
        </View>
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
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.08,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  lightHeaderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  darkHeaderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  lightHeaderIcon: {
    fontSize: 24,
    color: '#666666',
  },
  darkHeaderIcon: {
    fontSize: 24,
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    zIndex: 0,
  },
  bottomNavContainer: {
    height: height * 0.1,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
});

export default App;
