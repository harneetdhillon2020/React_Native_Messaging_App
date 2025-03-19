import React, {useState, useContext} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const AddMessageView = ({navigation}) => {
  const {addMessageModel, selectedWorkspace, selectedChannel} =
    useContext(ViewModelContext);
  const [content, setContent] = useState('');

  const handleAddMessage = async () => {
    await addMessageModel(selectedChannel, content, selectedWorkspace);
    navigation.goBack();
  };

  const isAddDisabled = content.length < 4;

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          accessibilityLabel="content"
          placeholder="Content"
          value={content}
          onChangeText={text => setContent(text)}
          style={styles.textInput}
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          accessibilityLabel="add"
          title="Add"
          disabled={isAddDisabled}
          onPress={handleAddMessage}
        />
        <Button
          accessibilityLabel="cancel"
          title="Cancel"
          onPress={navigation.goBack}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    maxHeight: '50%',
  },
  textInput: {
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginTop: 10,
  },
});

export default AddMessageView;
