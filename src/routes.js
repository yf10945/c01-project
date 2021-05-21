const express = require('express');
const cors = require('cors');
const router = express.Router();
const validateUser = require('./validator');

const userController = require('./back-end/controller/UserController');
const signupController = require('./back-end/controller/SignupController');
const loginController = require('./back-end/controller/LoginController');
const profileController = require('./back-end/controller/ProfileController');
const pickspredictionsController = require('./back-end/controller/PicksPredictionsController');
const debateController = require('./back-end/controller/DebateController');
const thezoneController = require('./back-end/controller/TheZoneController');
const triviaController = require('./back-end/controller/TriviaController');

//cors necessary for calling from different port/url
router.use(cors());

/* USER */

// Check existing username
router.put('/user/check/username', userController.user_check_username_get);

// Check existing email address
router.put('/user/check/email', userController.user_check_email_get);

// Check existing phone number
router.put('/user/check/phonenum', userController.user_check_phonenum_get);

// Update user password
router.put('/user/update/password', userController.user_update_password_put);

// Update user email
router.put('/user/update/email', userController.user_update_email_put);

// Update user phone number
router.put('/user/update/phonenum', userController.user_update_phonenum_put);

// Send user password recovery email
router.put(
    '/user/send/password',
    userController.user_send_new_password_recovery_email
);

// Send user new email confirmation email
router.put(
    '/user/send/email',
    userController.user_send_new_email_confirmation_email
);

// Send user new phone number sms
router.put(
    '/user/send/phonenum',
    userController.user_send_new_phonenum_confirmation_sms
);

/* SIGNUP */

// Signup user
router.put('/signup', validateUser.validateUser, signupController.user_put);

/* LOGIN */

// Get login authentication
router.put('/login', loginController.auth);

// Logout
router.put('/logout', loginController.deauth);

/* PROFILE */

// Add match to profile picks
router.put('/profile/add/picks', profileController.profile_add_picks_put);

// Add user to profile tracker
router.put('/profile/add/tracker', profileController.profile_add_user_tracker_put);

// Get profile
router.get('/profile', profileController.profile_get);

// Get profile picks
router.get('/profile/picks', profileController.profile_picks_get);

// Get profile tracker
router.get('/profile/tracker', profileController.profile_tracker_get);

// Get profile picture
router.get('/profile/picture', profileController.profile_picture_get);

// Get profile's links
router.get('/profile/links', profileController.profile_links_get);

// Update profile picture
router.put(
    '/profile/update/picture',
    profileController.profile_update_picture_put
);

// Update profile about
router.put('/profile/update/about', profileController.profile_update_about_put);

// Update profile status
router.put(
    '/profile/update/status',
    profileController.profile_update_status_put
);

// Update profile tracker
router.put(
    '/profile/update/tracker',
    profileController.profile_update_tracker_put
);

// Update profile ACS
router.put('/profile/update/ACS', profileController.profile_update_ACS_put);

// Update profile link for facebook
router.put('/profile/update/links/facebook', profileController.profile_update_links_facebook_put);

// Update profile link for twitter
router.put('/profile/update/links/twitter', profileController.profile_update_links_twitter_put);

// Update profile link for instagram
router.put('/profile/update/links/instagram', profileController.profile_update_links_instagram_put);

// Delete profile tracker
router.delete('/profile/delete/tracker', profileController.profile_tracker_del);

/* TRIVIA */

// Create question
router.put('/trivia/create/question', triviaController.question_put);

// Get 10 random questions
router.get('/trivia/question/10', triviaController.question_random_10_get);

// Get all questions
router.get('/trivia/question/all', triviaController.question_all_get);

// Update question
router.put('/trivia/update/question', triviaController.question_update_put);

// Delete question
router.delete('/trivia/delete/question', triviaController.question_del);

// Calculate ACS after a Solo Trivia game
router.put('/trivia/update/ACS/solo', triviaController.update_acs_solo);

/* PICKS & PREDICTIONS */

// Create matches
router.put(
    '/picksandpredictions/create/match',
    pickspredictionsController.matches_put
);

// Get matches
router.get(
    '/picksandpredictions/match',
    pickspredictionsController.matches_get
);

// Update matches
router.put(
    '/picksandpredictions/update/match',
    pickspredictionsController.matches_update_put
);

// Delete matches
router.delete(
    '/picksandpredictions/delete/match',
    pickspredictionsController.matches_del
);

/* DEBATE */

// Create debate topics
router.put('/debates/create/topic', debateController.debate_topics_put);

// Create debate submission
router.put(
    '/debates/create/submission',
    debateController.debate_submission_put
);

// Get debate topic for a user
router.get('/debates/topic', debateController.debate_topics_get);

// Get debate submission for any user (query)
router.get('/debates/submission', debateController.debate_submission_get);

// Get all debate submissions within the user's tier
router.get('/debates/submission/all', debateController.debate_submission_get_all);

// Update debate submission score
router.put(
    '/debates/submission/update/score',
    debateController.debate_submission_update_score_put
);

// TEMP: Reset debate analyses + get new topics
router.get('/debates/daily', debateController.debate_daily);

/* THE ZONE */

// Create the zone post
router.put('/thezone/create/post', thezoneController.the_zone_post_put);

// Get the zone post
router.get('/thezone/post', thezoneController.the_zone_post_get); // PUT request to accept input

// Get all zone posts
router.get('/thezone/post/all', thezoneController.the_zone_all_posts_get);

// Get all comments on a post
router.get('/thezone/post/comments', thezoneController.the_zone_post_comments_get);

// Update the zone post
router.put('/thezone/update/post', thezoneController.the_zone_update_post_put);

// Update the zone post votes
router.put('/thezone/update/vote', thezoneController.the_zone_update_vote_put);

// Update the zone post's comment
router.put('/thezone/update/post/comment', thezoneController.the_zone_comment_put);

// Update the zone post comment's vote
router.put('/thezone/update/post/comment/vote', thezoneController.the_zone_update_comment_vote_put)

// Delete the zone post
router.delete('/thezone/delete/post', thezoneController.the_zone_post_del);

// Delete the zone comment
router.delete('/thezone/delete/comment', thezoneController.the_zone_comment_del);
module.exports = router;