// Copied file from my Assignment 8

import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback, StyleSheet, Text, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const MemberCard = ({members}) => {
  const {deleteWorkspaceMemberModel, selectedWorkspace} =
    React.useContext(ViewModelContext);

  // ###################################################  SWIPE ###################################################

  const swipeableRef = React.useRef(null);

  const handleDeleteWorkspaceMember = () => {
    deleteWorkspaceMemberModel(selectedWorkspace, members);
    swipeableRef.current.close();
  };

  const rightSwipeActions = () => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDeleteWorkspaceMember()}>
        <View>
          <Text
            style={styles.name}
            accessibilityLabel={`delete ${members.name}`}>
            Delete
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // ###################################################  SWIPE ###################################################
  return (
    <Swipeable ref={swipeableRef} renderRightActions={rightSwipeActions}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.item}>{members.name}</Text>
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
});

export default MemberCard;
