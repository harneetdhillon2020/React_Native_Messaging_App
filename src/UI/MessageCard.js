// Sources: Lecture Slides (Swipe)

import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback, StyleSheet, Text, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

// Copy/Pasted from asgn6
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

const MessageCard = ({message, navigation}) => {
  const {
    user,
    members,
    deleteMessageModel,
    selectedChannel,
    selectedWorkspace,
  } = React.useContext(ViewModelContext);

  // ###################################################  SWIPE ###################################################

  const swipeableRef = React.useRef(null);

  const handleDeleteMessage = () => {
    deleteMessageModel(message, selectedChannel, selectedWorkspace);
    swipeableRef.current.close();
  };

  const rightSwipeActions = () => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDeleteMessage()}>
        <View>
          <Text style={styles.name} accessibilityLabel={'delete message'}>
            Delete
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // Check permissions to delete
  const canSwipe =
    user.id === message.member || user.id === selectedWorkspace.owner;

  // ###################################################  SWIPE ###################################################

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={canSwipe ? rightSwipeActions : null}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Message', {message: message});
        }}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={[styles.item, styles.name]}>
              {members.find(member => member.id === message.member).name}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.item}>{message.content}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{formatDate(message.posted)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  item: {
    paddingLeft: 10,
    fontSize: 16,
  },
  name: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    paddingRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MessageCard;
