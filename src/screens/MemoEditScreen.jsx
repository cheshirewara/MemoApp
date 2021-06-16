import { shape, string } from 'prop-types';
import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Alert,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoEditScreen(props) {
  // construltor
  const { navigation, route } = props;
  const { id, bodyText } = route.params;

  const [body, setBody] = useState(bodyText);

  // useEffect

  // hundler function
  function handlePress() {
    const { currentUser } = firebase.auth();

    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, { merge: true })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  }

  return (
    <KeyboardSafeView style={styles.container}>
      {/* <AppBar /> */}

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={body}
          onChangeText={(text) => { setBody(text); }}
        />
      </View>

      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      bodyText: string,
    }),
  }).isRequired,
};

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
