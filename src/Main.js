/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ViewModelContext} from './Model/ViewModel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LoginView from './UI/LoginView';
import WorkspaceList from './UI/WorkspaceList';
import ChannelList from './UI/ChannelList';
import MessageList from './UI/MessageList';
import MemberList from './UI/MemberList';
import AddMemberList from './UI/AddMemberList';
import MessageView from './UI/MessageView';
import AddMessageView from './UI/AddMessageView';
import AddChannelView from './UI/AddChannelView';
import AddWorkspaceView from './UI/AddWorkspaceView';

const Stack = createStackNavigator();

const Main = () => {
  const {user, members, logoutModel, resetModel, selectedWorkspace} =
    useContext(ViewModelContext);
  // Stay on Login screen until valid credentials provided
  if (user === undefined) {
    return <LoginView />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          // https://stackoverflow.com/questions/52307978/how-to-disable-react-navigations-stack-navigator-transition
          screenOptions={{
            animationEnabled: false,
          }}>
          <Stack.Screen
            name="Workspaces"
            component={WorkspaceList}
            options={({navigation}) => ({
              title: 'Workspaces',
              headerLeft: () => (
                <MaterialIcons
                  name="logout"
                  accessibilityLabel="logout"
                  size={25}
                  color="cadetblue"
                  style={{marginLeft: 15}}
                  onPress={logoutModel}
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="home-plus-outline"
                    accessibilityLabel="add workspace"
                    size={25}
                    color="cadetblue"
                    style={{marginRight: 15}}
                    onPress={() => navigation.navigate('New Workspace')}
                  />
                  <Fontisto
                    name="arrow-return-left"
                    accessibilityLabel="reset"
                    size={25}
                    color="cadetblue"
                    style={{marginRight: 15}}
                    onPress={resetModel}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Channels"
            component={ChannelList}
            options={({route, navigation}) => ({
              title: route.params.workspace.name,
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to workspaces',
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 15}}>
                  {user.id === selectedWorkspace.owner ? (
                    <MaterialCommunityIcons
                      name="account-multiple-plus-outline"
                      accessibilityLabel="add members"
                      size={25}
                      color="cadetblue"
                      onPress={() => navigation.navigate('Members')}
                    />
                  ) : null}
                  {user.id === selectedWorkspace.owner ? (
                    <MaterialCommunityIcons
                      name="folder-plus-outline"
                      accessibilityLabel="add channel"
                      size={25}
                      color="cadetblue"
                      style={{marginLeft: 15}}
                      onPress={() => navigation.navigate('New Channel')}
                    />
                  ) : null}
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Messages"
            component={MessageList}
            options={({route, navigation}) => ({
              title: route.params.channel.name,
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to channels',
              headerRight: () => (
                <MaterialCommunityIcons
                  name="comment-plus-outline"
                  accessibilityLabel="add message"
                  size={25}
                  color="cadetblue"
                  style={{marginRight: 15}}
                  onPress={() => navigation.navigate('New Message')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="New Message"
            component={AddMessageView}
            options={() => ({
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to channel',
            })}
          />
          <Stack.Screen
            name="New Channel"
            component={AddChannelView}
            options={() => ({
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to channels',
            })}
          />
          <Stack.Screen
            name="New Workspace"
            component={AddWorkspaceView}
            options={() => ({
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to workspaces',
            })}
          />
          <Stack.Screen
            name="Members"
            component={MemberList}
            options={({navigation}) => ({
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to workspace',
              headerRight: () => (
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  accessibilityLabel="add member"
                  size={25}
                  color="cadetblue"
                  style={{marginRight: 15}}
                  onPress={() => navigation.navigate('Add Member')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Add Member"
            component={AddMemberList}
            options={() => ({
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to members',
            })}
          />
          <Stack.Screen
            name="Message"
            component={MessageView}
            options={({route}) => ({
              title: members.find(
                member => member.id === route.params.message.member,
              ).name,
              headerBackTitle: 'Back',
              headerBackAccessibilityLabel: 'back to channel',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Main;
