import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';
import WorkspaceCard from './WorkspaceCard.js';

const WorkspaceList = ({navigation}) => {
  const {workspaces} = useContext(ViewModelContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={workspaces}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <WorkspaceCard workspace={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default WorkspaceList;
