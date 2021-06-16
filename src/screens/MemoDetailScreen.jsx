import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import {
  ScrollView, View, Text, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import { dateToString } from '../utils';

import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen(props) {
  // constructor
  const { navigation, route } = props;
  const { id } = route.params;

  // screen object
  const [memo, setMemo] = useState(null);

  // useEffect
  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    let unsubscribe = () => {};

    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`)
        .doc(id);
      // データ取得
      unsubscribe = ref.onSnapshot((snapshot) => {
        // 順にメモを取り出す
        // console.log(snapshot.id, snapshot.data());
        const data = snapshot.data();
        setMemo({
          id: snapshot.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
      // stateに保存
      });
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>

      {/* <AppBar /> */}

      <View style={styles.memoHeader}>
        <Text
          style={styles.memoTitle}
          numberOfLines={1}
        >
          {memo && memo.bodyText}
        </Text>
        <Text
          style={styles.memoDate}
        >
          {memo && dateToString(memo.updatedAt)}
        </Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>

      <CircleButton
        name="pencil"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => {
          navigation.navigate(
            'MemoEdit',
            { id: memo.id, bodyText: memo.bodyText },
          );
        }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#FFF',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 16,
  },
  memoBody: {
    backgroundColor: '#FFF',
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
