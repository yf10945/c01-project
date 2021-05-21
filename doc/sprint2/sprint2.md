# Sprint goal
 Connecting front-end and back-end for login, signup, profile and the zone
 
# Participants
* Our team: Yes
* TA: Swarup Srini
* Product Owners: Jacob, Warren Ward
 
# Team capacity (max amount of user story points the team can take on)
78

# Decisions about user stories to be implemented
* Prioritize integration of software and connecting front-end and back-end part of code together
* Continue to work on user story for signup, login, profile and the zone until they are fully integrated

# Stories to be completed
* As a registered user, I want to recover my password so that I can access my account again if I forget
   * YES-15
   * Description:
   * CoS:
      * User can recover password by resetting through the email they entered
      * Make sure the new password works after resetting
      * Receive confirmation after the password has successfully reset and changed
* As a registered user, I want to view my profile, so that I can make sure my account info is correct.
   * YES-17
   * Description:
   * CoS:
      * They should see what's available to the public: name, profile picture, About section, ACS and tier, status, their interests, this week's pick history, and linked social media accounts
      * Private information should not be visible to the public (phone number, etc)
* As a registered user, I want to be able to change my information in profile so that I can share basic information about myself via the app
   * YES-20
   * Description:
   * CoS:
      * User can change profile picture
      * User can fill in an About section
      * User can set a status
      * User can view a user’s profile by clicking on their picture
* As a registered user, I want to be able to track my ACS so that I can see how credible I am as a sports analyst
   * YES-24
   * Description:
   * CoS:
      * View current score
      * View current tier
* As a registered user, I want to link my social media accounts so that other people can keep in touch with me
   * YES-32
   * Description:
   * CoS:
      * Link Twitter, Facebook, Instagram
      * Links to their social media should be accessible in their Profile page after linking
* As a registered user, I want to see my pick history so that I/other people can review my previous predictions
   * YES-33
   * Description:
      * verify that picks from previous selections correct
      * verify that I can view my previous picks
      * verify that other people can view my previous picks
* As a registered user, I want to be able to get back to The Zone from any part of the app (home button) so that I may check out another menu option from this app
   * YES-36
   * Description:
      * able to go back to the zone from other places in the application
         * open court
         * trivia
         * debate
         * picks and predictions
         * profile(s), users and other peoples
      * unsaved actions lost
* As a registered user, I want to be able to view posts (includes a title, message, and original poster’s name) so that I can see what other people have to say
   * YES-37
   * Description:
      * View posts
         * title
         * message
         * posters name
         * able to find the post on open court
* As a registered user, I want to be able to create posts so that I can share what I have to say
   * YES-38
   * Description:
      * post has information on
         * user that posted
         * date
         * title
         * message
      * post viewable by other people
      * Repost from other social media platforms so that I may easily share what I found outside this app
      * profile of poster accessible from the post
* As a registered user, I want a navigation bar so that I can go back to pages and ensure im logged in
   * YES-101
   * Description:
   * UI Component Navigation Bar for every page when user is logged in
   * ensure:
      * navigation bar visible
      * user visible and correct
      * log out button available
* As a registered user, I want to be able to add people to my personal tracker so that I can see their ACS.
   * YES-105
   * Description:
      * People can add users to tracker
      * ACS is accurate to users
* As a registered user, I want to see that I have successfully signed up by making a HTTP request
   * YES-107
   * Description:
   * This is for the front end to make http requests to the server so it can send data and retrieve data for it's views.
* As a registered user, I want to change my user information so I can keep my information updated
   * YES-114
   * Description:
      * Allow users to update their email, password, or phone number.

# Task breakdowns: broken down into multiple subtasks on Jira
* YES-15 Password Recovery
   * YES-18 Link account to email/phone num
   * YES-19 Reset password
* YES-17 View Profile
   * YES-97 Create viewable components for profile
* YES-20 Edit Profile
   * YES-21 Change profile picture
   * YES-22 Fill in ‘About’
   * YES-23 Fill in ‘Status’
   * YES-106 Click on profile to view
* YES-24 Track ACS
   * N/A
* YES-32 Link Social Media
   * YES-116 API calls to give Profile a list of social media links
   * YES-117 Redirect user from Profile to allow linking
* YES-33 View Pick History
   * N/A
* YES-36 Nav bar
   * YES-100 Components
* YES-37 View posts
   * YES-75 Comment on posts
   * YES-79 Agree/Disagree on posts
   * YES-109 Components to view post
* YES-38 Create Posts
   * YES-77 View owner
   * YES-115 Connect frontend/backend
* YES-101 Stay logged in while moving through the app using nav bar
   * N/A
* YES-105 View ACS
   * N/A
* YES-107 Notify on complete signup
   * YES-108 Verification (backend)
   * YES-110 Validation on forms (frontend)
   * YES-111 Connecting frontend/backend
   * YES-112 Updating appearance
   * YES-113 Verify uniqueness of username, email, phonenum
* YES-114 Modify user info
