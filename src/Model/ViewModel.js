/*
Sources:
James helped me refactor this file and gave me secret sauce
*/

import React, {useState, createContext} from 'react';

import {LOGIN, RESET} from '../Repo/SystemRepo';
import {
  GET as GET_WORKSPACES,
  ADD as ADD_WORKSPACE,
  DELETE as DELETE_WORKSPACE,
} from '../Repo/WorkspaceRepo';
import {
  GET as GET_CHANNELS,
  ADD as ADD_CHANNEL,
  DELETE as DELETE_CHANNEL,
} from '../Repo/ChannelRepo';
import {GET as GET_MESSAGES, ADD, DELETE} from '../Repo/MessageRepo';
import {
  GET as GET_MEMBERS,
  GET_WORKSPACE_MEMBERS,
  ADD_WORKSPACE_MEMBER,
  DELETE_WORKSPACE_MEMBER,
} from '../Repo/MemberRepo';

export const ViewModelContext = createContext();

const ViewModel = props => {
  const [user, setUser] = useState(); // Login Response
  const [members, setMembers] = useState([]); // Array of all members
  const [workspaces, setWorkspaces] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedWorkspaceMembers, setSelectedWorkspaceMembers] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState();
  const [selectedChannel, setSelectedChannel] = useState();

  // ########################################################  SYSTEM  ########################################################

  // Login and Fetch Workspaces
  const loginModel = async (email, password) => {
    LOGIN(email, password)
      .then(async response => {
        setUser(response);
        setWorkspaces(await GET_WORKSPACES(response));
        setMembers(await GET_MEMBERS(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Logout (Inspired By Chat GPT)
  const logoutModel = async () => {
    setUser(undefined);
    setSelectedWorkspace(undefined);
    setSelectedChannel(undefined);
    setWorkspaces([]);
    setChannels([]);
    setMessages([]);
  };

  // Reset
  const resetModel = async () => {
    await RESET(user);
    setSelectedWorkspace(undefined);
    setSelectedChannel(undefined);
    setSelectedWorkspaceMembers(undefined);
    setWorkspaces([]);
    setChannels([]);
    setMessages([]);
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // ########################################################  DELETE  ########################################################

  // Delete Message and Update App Data
  const deleteMessageModel = async (message, channel, workspace) => {
    await DELETE(user, message);
    setMessages(await GET_MESSAGES(user, channel));
    setChannels(await GET_CHANNELS(user, workspace));
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Delete Channel and Update App Data
  const deleteChannelModel = async (channel, workspace) => {
    await DELETE_CHANNEL(user, channel);
    setChannels(await GET_CHANNELS(user, workspace));
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Delete Workspace and Update App Data
  const deleteWorkspaceModel = async workspace => {
    setSelectedWorkspaceMembers(undefined);
    await DELETE_WORKSPACE(user, workspace);
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Delete Workspace Member and Update App Data
  const deleteWorkspaceMemberModel = async (workspace, member) => {
    await DELETE_WORKSPACE_MEMBER(user, workspace, member);
    setSelectedWorkspaceMembers(await GET_WORKSPACE_MEMBERS(user, workspace));
  };

  // ########################################################  ADD  ########################################################

  // Add Message and Update App Data
  const addMessageModel = async (channel, content, workspace) => {
    await ADD(user, channel, content);
    setMessages(await GET_MESSAGES(user, channel));
    setChannels(await GET_CHANNELS(user, workspace));
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Add Channel and Update App Data
  const addChannelModel = async (workspace, name) => {
    await ADD_CHANNEL(user, workspace, name);
    setChannels(await GET_CHANNELS(user, workspace));
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Add Workspace and Update App Data
  const addWorkspaceModel = async name => {
    await ADD_WORKSPACE(user, name);
    setWorkspaces(await GET_WORKSPACES(user));
  };

  // Add Workspace Member and Update App Data
  const addWorkspaceMemberModel = async (workspace, member) => {
    await ADD_WORKSPACE_MEMBER(user, workspace, member);
    setSelectedWorkspaceMembers(await GET_WORKSPACE_MEMBERS(user, workspace));
  };

  // ########################################################  SELECT  ########################################################

  // Select Workspace and Fetch Channels
  const selectWorkspace = async workspace => {
    setSelectedWorkspace(workspace);
    setSelectedWorkspaceMembers(await GET_WORKSPACE_MEMBERS(user, workspace));
    setChannels(await GET_CHANNELS(user, workspace));
  };

  // Select Channel And Fetch Messages
  const selectChannel = async channel => {
    setSelectedChannel(channel);
    setMessages(await GET_MESSAGES(user, channel));
  };

  return (
    <ViewModelContext.Provider
      value={{
        user,
        loginModel,
        logoutModel,
        resetModel,
        addMessageModel,
        addChannelModel,
        addWorkspaceModel,
        addWorkspaceMemberModel,
        deleteMessageModel,
        deleteChannelModel,
        deleteWorkspaceModel,
        deleteWorkspaceMemberModel,
        workspaces,
        selectedWorkspace,
        selectWorkspace,
        channels,
        selectedChannel,
        selectChannel,
        messages,
        members,
        selectedWorkspaceMembers,
      }}>
      {props.children}
    </ViewModelContext.Provider>
  );
};

export default ViewModel;
