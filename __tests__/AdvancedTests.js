/*
 * Copyright (C) 2022-2023 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */

/* **************************************************************************
 * Must be using Node.js Version 18 or above
 * **************************************************************************/

/* **************************************************************************
 * Use your own username and password for these tests
 * **************************************************************************/

const cruzid = 'hdhillo3@ucsc.edu';
const studentid = '1789850';

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import App from '../App';

const login = (email = cruzid, password = studentid) => {
  render(<App />);
  fireEvent.changeText(screen.getByLabelText('email'), email);
  fireEvent.changeText(screen.getByLabelText('password'), password);
  fireEvent.press(screen.getByLabelText('login'));
};

const loginWill = (email = 'will@cse118.com', password = 'will') => {
  render(<App />);
  fireEvent.changeText(screen.getByLabelText('email'), email);
  fireEvent.changeText(screen.getByLabelText('password'), password);
  fireEvent.press(screen.getByLabelText('login'));
};

const waitForTextThenClick = async text => {
  await waitFor(() => screen.getByText(text));
  fireEvent.press(screen.getByText(text));
};

const waitForLabelTextThenClick = async labelText => {
  await waitFor(() => screen.getByLabelText(labelText));
  fireEvent.press(screen.getByLabelText(labelText));
};

const waitForFirstLabelTextThenClick = async labelText => {
  await waitFor(() => screen.getAllByLabelText(labelText));
  fireEvent.press(screen.getAllByLabelText(labelText)[0]);
};

// Took From ScrollTesting File
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const scrollTo = async (text, labelText) => {
  const eventData = {
    nativeEvent: {
      contentOffset: {
        y: 500,
        x: 0,
      },
      contentSize: {
        height: 500,
        width: 100,
      },
      layoutMeasurement: {
        height: 500,
        width: 100,
      },
    },
  };
  for (let i = 0; i < 10; i++) {
    if (screen.queryByText(text) != null) {
      return;
    } else {
      await sleep(200);
      fireEvent.scroll(screen.getByLabelText(labelText), eventData);
    }
  }
};

/*
 * Log in
 * Add a workspace
 * Assert workspace exists
 * Delete the workspace
 * Assert workspace does not exist
 */
it('Adds & Deletes Workspaces', async () => {
  login();
  let wsName = 'Test Workspace A';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Start to add a workspace
 * Cancel
 * Assert back at workspace list
 */
it('Cancels Add Workspaces', async () => {
  login();
  let wsName = 'Test Works B';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('cancel'));
  await waitFor(() => screen.getByText('Student Workspace'));
  cleanup();
});

/*
 * Log in
 * Start to add a workspace
 * Navigate backwards
 * Assert back at workspace list
 */
it('Navigates Back From Add Workspaces', async () => {
  login();
  let wsName = 'Test Works C';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('back to workspaces'));
  await waitFor(() => screen.getByText('Student Workspace'));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add a channel
 * Assert channel exists
 * Delete the channel
 * Assert channel does not exist
 * Delete the workspace
 */
it('Adds & Deletes Channels', async () => {
  login();
  let wsName = 'Test Workspace D';
  let chName = 'Test Channel E';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), chName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(chName));
  fireEvent(screen.getByText(chName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${chName}`);
  await waitForElementToBeRemoved(() => screen.getByText(chName));
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Start to add a channel
 * Cancel
 * Assert back at channel list
 * Delete the workspace
 */
it('Cancels Add Channels', async () => {
  login();
  let wsName = 'Test Workspace F';
  let chName = 'Test Chan G';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), chName);
  fireEvent.press(screen.getByLabelText('cancel'));
  await waitFor(() => screen.getByLabelText('add channel'));
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select a workspace
 * Start to add a channel
 * Navigate backwards
 * Assert back at channel list
 * Delete the workspace
 */
it('Navigates Back From Add Channels', async () => {
  login();
  let wsName = 'Test Workspace H';
  let chName = 'Test Chan I';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), chName);
  fireEvent.press(screen.getByLabelText('back to channels'));
  await waitFor(() => screen.getByLabelText('add channel'));
  fireEvent.press(screen.getByLabelText('back to workspaces'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add Molly Member and Anna Admin as members
 * Assert Molly and Anna are members of the workspace
 * Delete the workspace
 */
it('Adds Members', async () => {
  login();
  let wsName = 'Test Workspace J';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add members');
  await waitForLabelTextThenClick('add member');
  await waitFor(() => screen.getByText('Add Member'));
  fireEvent(screen.getByText('Anna Admin'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add Anna Admin`);
  await scrollTo('Molly Member', 'uninvited members');
  await waitFor(() => screen.getByText('Molly Member'));
  fireEvent(screen.getByText('Molly Member'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add Molly Member`);
  fireEvent.press(screen.getByLabelText('back to members'));
  await waitFor(() => screen.getByText('Anna Admin'));
  await waitFor(() => screen.getByText('Molly Member'));
  fireEvent(screen.getByText('Molly Member'), 'swipeableRightOpen');
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspaca
 * Add William Shakespeare as a member
 * Assert Will is a member of the workspace
 * Remove Will as a member
 * Assert Will is no longer a member of the workspace
 * Delete the workspace
 */
it('Deletes Members', async () => {
  login();
  let wsName = 'Test Workspace K';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add members');
  await waitForLabelTextThenClick('add member');
  await waitFor(() => screen.getByText('Add Member'));
  await scrollTo('William Shakespeare', 'uninvited members');
  await waitFor(() => screen.getByText('William Shakespeare'));
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add William Shakespeare`);
  fireEvent.press(screen.getByLabelText('back to members'));
  await waitFor(() => screen.getByText('William Shakespeare')); // ???????????
  await waitFor(() => screen.getByText('William Shakespeare'));
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete William Shakespeare`);
  await waitForElementToBeRemoved(() =>
    screen.getByText('William Shakespeare'),
  );
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByLabelText('logout'));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Log out
 * Log in as will@cse118.com password "will"
 * Assert workspace is visiable
 * Log out
 * Log in
 * Delete the workspace
 */
it('Adds Members Advanced', async () => {
  login();
  let wsName = 'Test Workspace L';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add members');
  await waitForLabelTextThenClick('add member');
  await waitFor(() => screen.getByText('Add Member'));
  await scrollTo('William Shakespeare', 'uninvited members');
  await waitFor(() => screen.getByText('William Shakespeare'));
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add William Shakespeare`);
  fireEvent.press(screen.getByLabelText('back to members'));
  await waitFor(() => screen.getByText('William Shakespeare')); // ???????????
  await waitFor(() => screen.getByText('William Shakespeare'));
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  loginWill();
  await waitFor(() => screen.getByText(wsName));
  await waitForLabelTextThenClick('logout');
  login();
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Add a channel
 * Log out
 * Log in as will@cse118.com password "will"
 * Select the workspace
 * Select the channel
 * Add a new message
 * Assert message is visible
 * Log out
 * Log in
 * Delete the workspace
 */
it('Allows Other Members To Add Messages', async () => {
  login();
  let wsName = 'Test Workspace M';
  let chName = 'Test Channel N';
  let content = 'I am so done with class';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add members');
  await waitForLabelTextThenClick('add member');
  await waitFor(() => screen.getByText('Add Member'));
  await scrollTo('William Shakespeare', 'uninvited members');
  await waitFor(() => screen.getByText('William Shakespeare'));
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add William Shakespeare`);
  fireEvent.press(screen.getByLabelText('back to members'));
  await waitFor(() => screen.getByText('William Shakespeare')); // ???????????
  await waitFor(() => screen.getByText('William Shakespeare'));
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), chName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(chName));
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  loginWill();
  waitForTextThenClick(wsName);
  waitForTextThenClick(chName);
  await waitForLabelTextThenClick('add message');
  fireEvent.changeText(screen.getByLabelText('content'), content);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add message'));
  await waitFor(() => screen.getByText(content));
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  login();
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Add a channel
 * Add a new message
 * Log out
 * Log in as will@cse118.com password "will"
 * Select the workspace
 * Select the channel
 * Assert message cannot be deleted
 * Log out
 * Log in
 * Delete the workspace
 */
it('Checks Message Delete Permissions', async () => {
  login();
  let wsName = 'Test Workspace O';
  let chName = 'Test Channel P';
  let content = 'I really want to get an A';
  await waitFor(() => screen.getByText('Student Workspace'));
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), wsName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(wsName));
  fireEvent.press(screen.getByText(wsName));
  await waitForLabelTextThenClick('add members');
  await waitForLabelTextThenClick('add member');
  await waitFor(() => screen.getByText('Add Member'));
  await scrollTo('William Shakespeare', 'uninvited members');
  await waitFor(() => screen.getByText('William Shakespeare'));
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForLabelTextThenClick(`add William Shakespeare`);
  fireEvent.press(screen.getByLabelText('back to members'));
  await waitFor(() => screen.getByText('William Shakespeare')); // ???????????
  await waitFor(() => screen.getByText('William Shakespeare'));
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), chName);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByText(chName));
  waitForTextThenClick(chName);
  await waitForLabelTextThenClick('add message');
  fireEvent.changeText(screen.getByLabelText('content'), content);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add message'));
  await waitFor(() => screen.getByText(content));
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  loginWill();
  waitForTextThenClick(wsName);
  waitForTextThenClick(chName);
  await waitFor(() => screen.getByText(content));
  fireEvent(screen.getByText(content), 'swipeableRightOpen');
  expect(screen.queryByText('delete message')).toBeNull();
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  login();
  await waitFor(() => screen.getByText(wsName));
  fireEvent(screen.getByText(wsName), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${wsName}`);
  await waitForElementToBeRemoved(() => screen.getByText(wsName));
  cleanup();
});
