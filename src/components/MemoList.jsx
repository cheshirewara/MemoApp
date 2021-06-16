import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import {
  arrayOf, instanceOf, shape, string,
} from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import { Feather } from '@expo/vector-icons';

import { dateToString } from '../utils';
import Icon from './icon';

export default function MemoList(props) {
  // constructor
  const { memos } = props;
  const navigation = useNavigation();

  // render function
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
      >
        <View>
          <Text
            style={styles.memoListItemTitle}
            numberOfLines={1}
          >
            {item.bodyText}
          </Text>
          <Text
            style={styles.memoListItemDate}
          >
            {dateToString(item.updatedAt)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { Alert.alert('sure?'); }}
        >
          {/* <Text style={styles.memoListItemDelete}>X</Text> */}
          {/* <Feather name="x" size={16} color="#B0B0B0" /> */}
          <Icon name="delete" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoDelete: {
    padding: 8,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
});
