// Inspired by NetworkView.js example

/* Handles All Channel Related Data */

export const GET = async (user, workspace) => {
  let channels;
  await fetch(`https://cse118.com/api/v2/workspace/${workspace.id}/channel`, {
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
      channels = json;
    });
  return channels;
};

export const ADD = async (user, workspace, name) => {
  let newChannel;
  await fetch(`https://cse118.com/api/v2/workspace/${workspace.id}/channel`, {
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
      newChannel = json;
    });
  return newChannel;
};

export const DELETE = async (user, channel) => {
  await fetch(`https://cse118.com/api/v2/channel/${channel.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
