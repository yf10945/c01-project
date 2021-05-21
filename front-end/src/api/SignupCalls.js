import { BASE_URL } from './HttpClient.js';

/**
 * Creates a new user using the information from the sign up form.
 * Returns an object for the status of the request with the properties:
 * - `success`: `true` if successful, `false` if there was an error
 * - `reason`: the reason for the error; one of the following values
 *  - `''` default value for no errors
 *  - `'invalid'` invalid username, email, or password
 *  - `'unexpected'` an unexpected error from the database
 *  - `'network'` a network error
 *  - `'other'` an error that's none of the above
 *
 * Questions:\
 * q1: Favourite sport?\
 * q2: Age\
 * q3: Highest level of sport play?\
 * q4: What sport would you like to know/learn about?\
 * q5: Favourite sports team?
 */
export async function signUp(
    username, password, email, phone, q1, q2, q3, q4, q5) {
    // Send the request to the server
    const body = {
        username: username,
        // Hash password before sending
        password: password,
        email: email,
        phonenum: phone,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5
    };
    console.log('[DEBUG] SignUp: ' + JSON.stringify(body));
    return fetch(BASE_URL + '/signup', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        // Convert server response to appropriate status object
        let status = {
            success: false,
            reason: ''
        };
        switch(response.status) {
            // Sign up successful
            case 200:
                status.success = true;
                break;
            // Invalid username, email, or password
            case 400:
                status.reason = 'invalid';
                break;
            // Unexpected error with database
            case 500:
                status.reason = 'unexpected';
                break;
            // Some other error
            default:
                status.reason = 'other';
                // DEBUG ONLY
                console.error(
                    `Sign Up fetch had unexpected response code: ${response.status}
                    with status text: ${response.statusText}`
                );
                break;
        }
        return status;
    })
    .catch((error) => {
      // DEBUG ONLY
      console.error(`Sign up fetch rejected with error: ${error}`);
      // Fetch rejects with a TypeError when a network error occurs
      return { success: false, reason: 'network' };
    });
}
// TODO: talk with backend to fix no body allowed for GET
export async function isUsernameExists(username) {
    // const body = { username: username };
    // fetch(BASE_URL + '/user/check/username', {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // }).then(response => {
    //     let exists = false;
    //     switch(response.status) {
    //         // Doesn't exist.
    //         case 200:
    //             break;
    //         // Exists
    //         case 400:
    //             exists = true;
    //             break;
    //         // Some other error. Will assume it doesn't exist so it can be
    //         // tried again
    //         default:
    //             // DEBUG ONLY
    //             console.error(
    //                 `Username exists fetch had unexpected response code: ${response.status}
    //                 with status text: ${response.statusText}`
    //             );
    //             break;
    //     }
    //     return exists;
    // })
    // .catch((error) => {
    //   // DEBUG ONLY
    //   console.error(`Username exists fetch rejected with error: ${error}`);
    //   // Let the user try again until no network error
    //   return false;
    // });
    return false;
}

// TODO: talk with backend to fix no body allowed for GET
export async function isEmailExists(email) {
    // const body = { email: email };
    // fetch(BASE_URL + '/user/check/email', {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // }).then(response => {
    //     let exists = false;
    //     switch(response.status) {
    //         // Doesn't exist.
    //         case 200:
    //             break;
    //         // Exists
    //         case 400:
    //             exists = true;
    //             break;
    //         // Some other error. Will assume it doesn't exist so it can be
    //         // tried again
    //         default:
    //             // DEBUG ONLY
    //             console.error(
    //                 `Email exists fetch had unexpected response code: ${response.status}
    //                 with status text: ${response.statusText}`
    //             );
    //             break;
    //     }
    //     return exists;
    // })
    // .catch((error) => {
    //   // DEBUG ONLY
    //   console.error(`Email exists fetch rejected with error: ${error}`);
    //   // Let the user try again until no network error
    //   return false;
    // });
    return false;
}

// TODO: talk with backend to fix no body allowed for GET
export async function isPhoneExists(phone) {
    // const body = { phonenum: phone };
    // fetch(BASE_URL + '/user/check/phonenum', {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // }).then(response => {
    //     let exists = false;
    //     switch(response.status) {
    //         // Doesn't exist.
    //         case 200:
    //             break;
    //         // Exists
    //         case 400:
    //             exists = true;
    //             break;
    //         // Some other error. Will assume it doesn't exist so it can be
    //         // tried again
    //         default:
    //             // DEBUG ONLY
    //             console.error(
    //                 `Phone exists fetch had unexpected response code: ${response.status}
    //                 with status text: ${response.statusText}`
    //             );
    //             break;
    //     }
    //     return exists;
    // })
    // .catch((error) => {
    //   // DEBUG ONLY
    //   console.error(`Phone exists fetch rejected with error: ${error}`);
    //   // Let the user try again until no network error
    //   return false;
    // });
    return false;
}
