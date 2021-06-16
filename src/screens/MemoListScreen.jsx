import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';

import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';

export default function MemoListScreen(props) {
  // constructor
  const { navigation } = props;

  // screen object
  const [memos, setMemos] = useState([]);

  // useEffect
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`)
        .orderBy('updatedAt', 'desc');
      // データ取得
      unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = [];

        // 順にメモを取り出す
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          userMemos.push({
            id: doc.id,
            bodyText: doc.data().bodyText,
            updatedAt: doc.data().updatedAt.toDate(),
          });
        });
        // stateに格納
        setMemos(userMemos);
      },
      (error) => {
        console.log(error);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>

      {/* <AppBar /> */}
      <MemoList memos={memos} />
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
