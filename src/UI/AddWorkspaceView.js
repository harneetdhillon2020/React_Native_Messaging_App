import React, {useState, useContext} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {ViewModelContext} from '../Model/ViewModel';

const AddWorkspaceView = ({navigation}) => {
  const {addWorkspaceModel} = useContext(ViewModelContext);
  const [name, setName] = useState('');

  const handleAddWorkspace = async () => {
    await addWorkspaceModel(name);
    navigation.goBack();
  };

  const isAddDisabled = name.length < 4;

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          accessibilityLabel="name"
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          accessibilityLabel="add"
          title="Add"
          disabled={isAddDisabled}
          onPress={handleAddWorkspace}
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

export default AddWorkspaceView;
