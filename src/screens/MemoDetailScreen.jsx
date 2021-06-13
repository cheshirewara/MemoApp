import React from 'react';
import {
  ScrollView, View, Text, StyleSheet,
} from 'react-native';

import AppBar from '../components/Appbar';
import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen() {
  return (
    <View style={styles.container}>

      <AppBar />

      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2020年12月20日 10:00</Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          買い物リスト
          書体やレイアウトなどを確認するために用います。
          本文用なので使い方を間違えると不自然に見えることもありますので要注意。

          カタカナ語が苦手な方は「組見本」と呼ぶとよいでしょう。
          なお、組見本の「組」とは文字組のことです。
          活字印刷時代の用語だったと思います。
          このダミーテキストは自由に改変することが出来ます。
          主に書籍やウェブページなどのデザインを作成する時によく使われます。
          書体やレイアウトなどを確認するために用います。
        </Text>
      </ScrollView>

      <CircleButton name="edit-2" style={{ top: 160, bottom: 'auto' }} />
    </View>
  );
}

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
