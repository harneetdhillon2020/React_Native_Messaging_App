import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';
import MemberCard from './MemberCard.js';

const MemberList = ({navigation}) => {
  const {selectedWorkspaceMembers} = useContext(ViewModelContext);
  return (
    <View style={styles.container}>
      <FlatList
        accessibilityLabel="workspace members"
        data={selectedWorkspaceMembers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MemberCard members={item} navigation={navigation} />
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

export default MemberList;
