import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';
import ChannelCard from './ChannelCard';

const ChannelList = ({navigation}) => {
  const {channels} = useContext(ViewModelContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChannelCard channel={item} navigation={navigation} />
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

export default ChannelList;
