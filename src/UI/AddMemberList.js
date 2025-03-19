import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';
import AddMemberCard from './AddMemberCard.js';

const MemberList = ({navigation}) => {
  const {members, selectedWorkspaceMembers, user} =
    useContext(ViewModelContext);

  const otherMembers = members.filter(
    member =>
      member.id !== user.id && !selectedWorkspaceMembers.includes(member.id),
  );

  return (
    <View style={styles.container}>
      <FlatList
        accessibilityLabel="uninvited members"
        data={otherMembers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <AddMemberCard members={item} navigation={navigation} />
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
