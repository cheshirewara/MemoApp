import React from 'react';
import { StyleSheet, View } from 'react-native';

// import Hello from './src/components/Hello';
import AppBar from './src/components/Appbar';
import MemoList from './src/components/MemoList';
import CircleButton from './src/components/CircleButton';

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Hello bang>World</Hello>
  //     <Hello style={{ fontSize: 16 }}>small World</Hello>
  //     <Text>Open up App.js to start working on your app! edit</Text>
  //     {/* eslint-disable-next-line */}
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return (
    <View style={styles.container}>

      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },

});
