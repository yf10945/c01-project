# Sprint goal
Connect Profile and The Zone, start on Debate/Trivia, and make improvements to the UI so it looks less blocky.


# Participants
* Our team: Yes
* TA: Swarup Srini
* Product Owners: Jacob, Warren Ward


# Team capacity (max amount of user story points the team can take on)
78


# Decisions about user stories to be implemented
* Prioritize UI.
* Continue to work on Profile and The Zone, start on Debate/Trivia 


# Stories to be completed
* YES-17
   * As a registered user, I want to view my profile, so that I can make sure my account info is correct.
   * CoS:
      * They should see what's available to the public: name, profile picture, About section, ACS and tier, status, their interests, this week's pick history, and linked social media accounts
      * Private information should not be visible to the public (phone number, etc)
* YES-20
   * As a registered user, I want to be able to change my information in profile so that I can share basic information about myself via the app.
   * CoS:
      * Users should be able to do the following:
         * Select a profile picture
         * Edit their “About” message
         * Edit their “Status” message
         * View another user’s profile
* YES-24
   * As a registered user, I want to be able to track my ACS so that I can see how credible I am as a sports analyst.
   * CoS:
      * Users should be able to view their current ACS and tier.
* YES-32
   * As a registered user, I want to link my social media accounts so that other people can keep in touch with me.
   * CoS:
      * Users should be able to put links on their profile to other social media sites.
* YES-37
   * As a registered user, I want to be able to view posts (includes a title, message, and original poster’s name) so that I can see what other people have to say.
   * CoS:
      * Users should be able to do the following:
         * View/delete posts
         * Comment on posts
         * Agree/disagree on posts/comments
* YES-38
   * As a registered user, I want to be able to create posts so that I can share what I have to say.
   * CoS:
      * Users should be able to create posts.
* YES-47
   * As a registered user, I want to be able to Request a head-to-head battle with another user so that I may gain/lose ACS points
      * Provide an option to request battles with random users
      * Provide an option to request battles with friends
      * Verify that the user receives the battle request
      * Verify that the user can accept or deny the battle request
      * Verify that both users enter the trivia game at the same time
      * Verify that both users are visible on the screen during the match
* YES-50
   * As a registered user, I want to play a solo trivia game, so that I can test my knowledge and increase my ACS
      * Provide users a button to play solo
      * Verify that the trivia starts for the user and is alone
* YES-51
   * As a registered user, I want to have unique questions in my trivia game, so that I don’t get asked the same questions every game
      * Verify that once a question is asked then the question will not be asked again until all other questions are asked
* YES-69
   * As a registered user, I want to be able to debate/analyze the question in my tier so that I can gain points.
   * CoS
      * Verify that the user is in their own tier
      * Verify that the user is able to see which tier they are in
      * Verify that the user is rewarded/punished with ACS points post debate
* YES-71
   * As a registered user, I want to be able to agree/disagree on posts so that I can express my opinion on a debate (based on a scale from 1-10)
   * CoS
      * Verify that users can input opinions in a debate
      * Verify that users can input a score (from 1-10) on opposing opinions
      * Verify that the user is rewarded more for higher scores
* YES-78
   * As a registered user, I want to be able to Delete my own post so that I can avoid regret/incorrect information
      * deleted posts do not show up in open court
      * the poster gets a notification before deletion
      * post deleted forever
      * comments deleted too
* YES-101
   * As a registered user, I want a navigation bar so that I can go back to pages and ensure im logged in
      * UI Component Navigation Bar for every page when user is logged in
      * Ensure:
         * navigation bar visible
         * user visible and correct
         * log out button available
* YES-107
   * As a registered user, I want to see that I have successfully signed up by making a HTTP request
      * This is for the front end to make http requests to the server so it can send data and retrieve data for it's views.
* YES-118
   * As a registered user, I want to log in and stay logged in until I log out OR my cookies expire
      * CoS:
         * Users should be given a cookie for authorization on login.
         * Users should lose the cookie on logout.


# Task breakdowns: broken down into multiple subtasks on Jira
* YES-17
   * YES-97 Create components for Profile
   * YES-119 Connect Profile with API calls
* YES-20
   * YES-21 As a registered user, I want to select a profile picture so that I can express who I am
   * YES-22 As a registered user, I want to fill in an About section so that I can tell people about myself.
   * YES-23 As a registered user, I want to set a status, so that other people can see what I’m thinking.
   * YES-106 As a registered user, I want to be able to view a profile by clicking on their picture.
* YES-24
* YES-32
   * YES-116 Add API calls in the backend and give the Profile a list of social media links.
   * YES-117 Allow users to edit Facebook, Instagram and Twitter links from the front end, i.e. the Profile Page
* YES-37
   * YES-75 As a registered user, I want to be able to Comment on posts so that I can express my take on the subject of this post (backend)
   * YES-79 As a registered user, I want to be able to agree/disagree on posts so that I can express whether I agree/disagree
   * YES-109 Create component for displaying posts
   * YES-125 As a registered user, I want to be able to upvote/downvote comments on a post.
* YES-38
   * YES-77 As a registered user, I want to be able to See who created a post so that I may find out more about them
   * YES-115 Create front end API calls for the zone
   * YES-131 As a registered user, I want to be able to delete my own post.
* YES-47
   * YES-48 As a user, I want to get a notification from the app if my friend invites me to a trivia game so that I know and am alerted
* YES-50
   * YES-120 Storyboard the Trivia game on Figma
   * YES-121 Polish the UI
   * YES-130 Implement the UI
   * YES-132 Include front-end API calls
   * YES-133 Include back-end API calls
* YES-51
* YES-69
   * YES-122 Generate a question based on a user's ACS tier        
   * YES-123 Update requirements for debate
   * YES-124 Have the question appear on the user's Debate page and add an analysis textbox for submitting a response
   * YES-126 Storyboard the debate/analysis process on Figma
   * YES-127 Implement UI components based on storyboard
   * YES-128 Integrate the API with the front end
   * YES-129 Update the UI to match rest of application
* YES-71
* YES-78
* YES-101
* YES-107
   * YES-108 Check the data that's passed in and handle errors
   * YES-110 Add validation to the form fields
   * YES-111 Write the API for sending a sign up request and connect it to the form
   * YES-112 Update form CSS and appearance
   * YES-113 Split API calls to check if username, email, and phone number exists
* YES-118