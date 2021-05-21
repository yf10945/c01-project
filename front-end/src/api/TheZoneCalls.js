import { BASE_URL } from "./HttpClient.js"

export async function createPost(title, body) {
  const params = {
    content: {
      title: title,
      text: body,
      uploadedcontent:""
		}
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/create/post',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
	}
  return fetch(BASE_URL + '/thezone/create/post', foptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function createComment(post, text) {
  const params = {
    post: post,
    text: text
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/update/post/comment',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/thezone/update/post/comment', foptions)
    .then((response) => {
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
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/post/all',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include'
  }
  return fetch(BASE_URL + '/thezone/post/all', foptions)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function getPost(postid) {
  const params = {
    post: postid,
  };
  var newUrl = new URL(BASE_URL + '/thezone/post');
  newUrl.search = new URLSearchParams(params).toString();
  const foptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/post',
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

export async function updateVote(vote, postid) {
  const params = {
    postId: postid,
    vote: vote
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/update/vote',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/thezone/update/vote', foptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function updateVoteComment(vote, postid, commentid) {
  const params = {
    vote: vote,
    postId: postid,
    commentId: commentid
  };
  const foptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/update/post/comment/vote',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/thezone/update/post/comment/vote', foptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function deletePost(postid) {
  const params = {
    postId: postid
  };
  const foptions = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/delete/post',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/thezone/delete/post', foptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}

export async function deleteComment(postid, commentid) {
  const params = {
    postId: postid,
    commentId: commentid
  };
  const foptions = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL + '/thezone/delete/comment',
      'Access-Control-Allow-Credentials': true
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(params)
  }
  return fetch(BASE_URL + '/thezone/delete/comment', foptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error connecting to backend API: ' + error);
    });
}