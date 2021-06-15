import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoCreateScreen(props) {
  // constructor
  const { navigation } = props;

  // screen objext
  const [bodyText, setBodyText] = useState('');

  // handler
  function handlePress() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then((docRef) => {
        console.log('Create:', docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  return (
    <KeyboardSafeView style={styles.container}>
      {/* <AppBar /> */}

      {/* TODO:autoFocus android not enabled */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={bodyText}
          multiline
          autoFocus
          onChangeText={(text) => { setBodyText(text); }}
        />
      </View>

      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
