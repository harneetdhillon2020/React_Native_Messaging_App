// Inspired by NetworkView.js example

/* Handles All Member Related Data */

export const GET = async user => {
  let members;
  await fetch('https://cse118.com/api/v2/member', {
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
      members = json;
    });
  return members;
};

export const GET_WORKSPACE_MEMBERS = async (user, workspace) => {
  let members;
  await fetch(`https://cse118.com/api/v2/workspace/${workspace.id}/member`, {
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
      members = json;
    });
  return members;
};

export const ADD_WORKSPACE_MEMBER = async (user, workspace, member) => {
  let newMember;
  await fetch(
    `https://cse118.com/api/v2/workspace/${workspace.id}/member?mid=${member.id}`, // Chat GPT Gave me this url
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  );
  return newMember;
};

export const DELETE_WORKSPACE_MEMBER = async (user, workspace, member) => {
  let newMember;
  await fetch(
    `https://cse118.com/api/v2/workspace/${workspace.id}/member?mid=${member.id}`, // Chat GPT Gave me this url
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  );
  return newMember;
};
