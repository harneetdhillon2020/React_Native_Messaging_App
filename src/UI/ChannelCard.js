// Copied file from my Assignment 8

import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback, StyleSheet, Text, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const ChannelCard = ({channel, navigation}) => {
  const {user, deleteChannelModel, selectedWorkspace, selectChannel} =
    React.useContext(ViewModelContext);

  // ###################################################  SWIPE ###################################################

  const swipeableRef = React.useRef(null);

  const handleDeleteChannel = () => {
    deleteChannelModel(channel, selectedWorkspace);
    swipeableRef.current.close();
  };

  const rightSwipeActions = () => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDeleteChannel()}>
        <View>
          <Text
            style={styles.name}
            accessibilityLabel={`delete ${channel.name}`}>
            Delete
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // Check permissions to delete
  const canSwipe = user.id === selectedWorkspace.owner;

  // ###################################################  SWIPE ###################################################

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={canSwipe ? rightSwipeActions : null}>
      <TouchableWithoutFeedback
        onPress={() => {
          selectChannel(channel);
          navigation.navigate('Messages', {channel: channel});
        }}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.item}>{channel.name}</Text>
            <Text
              style={styles.info}
              accessibilityLabel={`count for ${channel.name}`}>
              {channel.messages > 0 ? channel.messages : ''}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    flex: 1,
  },
  info: {
    fontSize: 18,
  },
});

export default ChannelCard;
