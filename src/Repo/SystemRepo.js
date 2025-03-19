// Inspired by NetworkView.js example

/* Handles Login and Reset */

export const LOGIN = async (email, password) => {
  let user;
  await fetch('https://cse118.com/api/v2/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw `HTTP Error ${response.status}`;
    })
    .then(json => {
      user = json;
    });
  return user;
};

export const RESET = async user => {
  await fetch('https://cse118.com/api/v2/reset', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
