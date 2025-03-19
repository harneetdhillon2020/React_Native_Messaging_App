import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// From Asgn6
const formatDate = dateString => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return date.toLocaleString('en-US', options).replace(/,([^,]*)$/, ' at$1');
};

const SingleMessageCard = ({message}) => {
  return (
    <View>
      <Text style={styles.content}>{message.content}</Text>
      <Text style={styles.date}>{formatDate(message.posted)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    fontSize: 18,
  },
  date: {
    fontSize: 15,
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
  },
});

export default SingleMessageCard;
