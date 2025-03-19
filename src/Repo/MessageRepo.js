// Inspired by NetworkView.js example

/* Handles All Message Related Data */

export const GET = async (user, channel) => {
  let messages;
  await fetch(`https://cse118.com/api/v2/channel/${channel.id}/message`, {
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
      messages = json;
    });
  return messages;
};

export const ADD = async (user, channel, content) => {
  let newMessage;
  await fetch(`https://cse118.com/api/v2/channel/${channel.id}/message`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.accessToken}`,
    },
    body: JSON.stringify({
      content: content,
    }),
  })
    .then(response => {
      // if (response.status == 201)
      return response.json();
      // throw "HTTP Error " + response.status;
    })
    .then(json => {
      newMessage = json;
    });
  return newMessage;
};

export const DELETE = async (user, message) => {
  await fetch(`https://cse118.com/api/v2/message/${message.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
