import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StyleSheet, AppState} from 'react-native';

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the Foreground ..!');
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppStaate', appState.current);
  };
  return (
    <View style={style.container}>
      <Text> App state : check logs : - {appStateVisible}☺️ </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
