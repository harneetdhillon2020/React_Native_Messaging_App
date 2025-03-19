// Inspired by NetworkView.js example

/* Handles All Workspaces Related Data */

export const GET = async user => {
  let workspaces;
  await fetch('https://cse118.com/api/v2/workspace', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then(response => {
      //if (response.status === 200) {
      return response.json();
      //}
      //throw `HTTP Error ${response.status}`;
    })
    .then(json => {
      workspaces = json;
    });
  return workspaces;
};

export const ADD = async (user, name) => {
  let newWorkspace;
  await fetch('https://cse118.com/api/v2/workspace', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.accessToken}`,
    },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then(response => {
      //if (response.status === 201) {
      return response.json();
      //}
      //throw 'HTTP Error ' + response.status;
    })
    .then(json => {
      newWorkspace = json;
    });
  return newWorkspace;
};

export const DELETE = async (user, workspace) => {
  await fetch(`https://cse118.com/api/v2/workspace/${workspace.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
