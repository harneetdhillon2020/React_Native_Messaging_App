import React from 'react';
import {StyleSheet, View} from 'react-native';
import SingleMessageCard from '../UI/SingleMessageCard';

// Chat GPT Inspired
const MessageView = ({route}) => {
  const {message} = route.params;
  return (
    <View style={styles.container}>
      <SingleMessageCard message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MessageView;
