// Copied file from my Assignment 8

import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback, StyleSheet, Text, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const WorkspaceCard = ({workspace, navigation}) => {
  const {user, deleteWorkspaceModel, selectWorkspace} =
    React.useContext(ViewModelContext);

  // ###################################################  SWIPE ###################################################

  const swipeableRef = React.useRef(null);

  const handleDeleteWorkspace = () => {
    deleteWorkspaceModel(workspace);
    swipeableRef.current.close();
  };

  const rightSwipeActions = () => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDeleteWorkspace()}>
        <View>
          <Text
            style={styles.name}
            accessibilityLabel={`delete ${workspace.name}`}>
            Delete
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // Check permissions to delete
  const canSwipe = user.id === workspace.owner;

  // ###################################################  SWIPE ###################################################
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={canSwipe ? rightSwipeActions : null}>
      <TouchableWithoutFeedback
        onPress={() => {
          selectWorkspace(workspace);
          navigation.navigate('Channels', {workspace: workspace});
        }}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.item}>{workspace.name}</Text>
            <Text
              style={styles.info}
              accessibilityLabel={`count for ${workspace.name}`}>
              {workspace.channels > 0 ? workspace.channels : ''}
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

export default WorkspaceCard;
