import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';
import MessageCard from './MessageCard';

const MessageList = ({navigation}) => {
  const {messages} = useContext(ViewModelContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MessageCard message={item} navigation={navigation} />
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

export default MessageList;
