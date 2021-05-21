import { BASE_URL } from "./HttpClient.js"



export async function createPost(body) {
  const params = {
    answer: body
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/debates/create/submission',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/debates/create/submission', foptions)
    .then((response) => {
      console.log('response: ' + response.body.text);
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function getAllPost() {
  const foptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/debates/submission/all ',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include'
  }
  return fetch(BASE_URL + '/debates/submission/all', foptions)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function getPost(username) {
  const params = {
    username:username
  };
  var newUrl = new URL(BASE_URL + '/debates/submission');
  newUrl.search = new URLSearchParams(params).toString();
  const foptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/debates/submission',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
  }
  return fetch(newUrl, foptions)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function updateVote(vote, username) {
  const params = {
    username, username,
    vote: vote
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/debates/submission/update/score',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/debates/submission/update/score', foptions)
    .then((response) => {
      console.log('response: ' + response.body.text);
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function getDebateTopic() {
  const foptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/debates/topic',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include'
  }
  return fetch(BASE_URL + '/debates/topic', foptions)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}
