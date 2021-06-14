import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';

export default function MemoListScreen(props) {
  // constructor
  const { navigation } = props;

  // useEffect
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  return (
    <View style={styles.container}>

      {/* <AppBar /> */}
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});
