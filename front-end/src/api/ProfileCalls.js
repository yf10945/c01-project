import { BASE_URL, ORIGIN } from './HttpClient.js';
//get
const 
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    //get
    GETPROFILE = '/profile',
    GETPROFILEPICTURE = '/profile/picture',
    //update
    UPDATEPICTURE = '/profile/update/picture',
    UPDATEABOUT = '/profile/update/about',
    UPDATESTATUS = '/profile/update/status',
    UPDATELINKFACEBOOK = '/profile/update/links/facebook',
    UPDATELINKTWITTER = '/profile/update/links/twitter',
    UPDATELINKINSTAGRAM = '/profile/update/links/instagram',
    //tracker
    ADDTRACKER = '/profile/add/tracker',
    DELETETRACKER = '/profile/delete/tracker',
    UPDATETRACKER = '/profile/update/tracker';

//ensure status fields have no overlap with profile in db
const statusDef = { success: false, reason: '' };

/*Profile Full*/
export async function getProfile(username) {
    let newUrl = new URL(BASE_URL + GETPROFILE);
    const params = { username: username };
    newUrl.search = new URLSearchParams(params).toString();
    return await fetchJson(newUrl, fetchOptionsGet());
  }

/*ABOUT*/
export async function updateUserAbout(about) {
    let newUrl = new URL(BASE_URL + UPDATEABOUT);
    const params = { about: about };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

/*ACS*/

/*Profile Picture*/
export async function getUserPicture(username) {
    let newUrl = new URL(BASE_URL + GETPROFILEPICTURE);
    const params = { username: username };
    newUrl.search = new URLSearchParams(params).toString();
    return await fetchJson(newUrl, fetchOptionsGet());
}

export async function updateUserPicture(src) {
    let newUrl = new URL(BASE_URL + UPDATEPICTURE);
    const params = { picture: src };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

/*Radar*/
export async function addProfileTracker(username){
    let newUrl = new URL(BASE_URL + ADDTRACKER);
    const params = { username: username };
    return await fetchJson(newUrl, fetchOptionsWithBody(PUT, params));
}

export async function deleteProfileTracker(username){
    let newUrl = new URL(BASE_URL + DELETETRACKER);
    const params = { username: username };
    return await fetchText(newUrl, fetchOptionsWithBody(DELETE, params));
}

export async function updateProfileTracker(username){
    let newUrl = new URL(BASE_URL + UPDATETRACKER);
    const params = { username: username };
    return await fetchJson(newUrl, fetchOptionsWithBody(PUT, params));
}

/*Social*/
export async function updateLinkFacebook(link) {
    let newUrl = new URL(BASE_URL + UPDATELINKFACEBOOK);
    const params = { facebook: link };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

export async function updateLinkTwitter(link) {
    let newUrl = new URL(BASE_URL + UPDATELINKTWITTER);
    const params = { twitter: link };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

export async function updateLinkInstagram(link) {
    let newUrl = new URL(BASE_URL + UPDATELINKINSTAGRAM);
    const params = { instagram: link };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

/*Status*/
export async function updateUserStatus(status) {
    let newUrl = new URL(BASE_URL + UPDATESTATUS);
    const params = { status: status };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

function fetchOptionsGet(){
    return {
        method: GET,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
      };
}

function fetchOptionsWithBody(method, body){
    return {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(body),
      };
}

function statusCatcher(resStatus){
    // Convert server response to appropriate status object
    let status = {...statusDef};
    switch(resStatus) {
        // Call successful
        case 200:
            status.success = true;
            break;
        // Not authenticated
        case 401:
            status.reason = 'Not Authenticated';
            break;
        // Not authenticated
        case 404:
            status.reason = 'Not Found';
            break;
        // Unexpected error with database
        case 500:
            status.reason = 'Unexpected Database Failure';
            break;
        // Some other error
        default:
            status.reason = 'other';
            // DEBUG ONLY
            // console.error(
            //     `Sign Up fetch had unexpected response code: ${response.status}
            //     with status text: ${response.statusText}`
            // );
            break;
    }
    return status;
}

async function fetchJson(url, options){
    //handle calls that return json
    return await fetch(url, options)
    .then(async(res) => {
    let status = statusCatcher(res.status);
    if (status.success){
    //expect a json body with wanted information, merge with status
    Object.assign(status, await res.json());
    return status;
    } else {
    //on failure, (debug)
        console.log(status.reason);
        return status;
    }
    }).catch((error) => {
    console.log('Error connecting to backend service: ' + error);
    return {...statusDef};
    });
}

async function fetchText(url, options){
    //handle calls that return text rather than json
    // console.log(url);
    // console.log(options);
    return await fetch(url, options)
      .then(async(res) => {
      const status = statusCatcher(res.status);
      if (status.success){
       //expect text in body with backend message
       status.text = await res.text();
       return status;
      } else {
      //on failure, (debug)
          console.log(status.reason);
          return status;
      }
      }).catch((error) => {
        console.log('Error connecting to backend service: ' + error);
        return {...statusDef};
      });
}
