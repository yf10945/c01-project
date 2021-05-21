Sprint goal: Learn the software we’re going to be using, create CRC cards, and implement a small number of stories
Stories: 
* As a new user, I want to be able to create an account so that I can explore the app.
   * YES-11
   * Description:
      * CoS:
         * Must fill in the questionnaire (see related subtask)
         * Only 1 account per email/phone number
         * Invalid emails, phone numbers, and locations must not be accepted
         * Should receive email confirmation of successful account registration
* As a registered user, I want to be able to log into my account so that I can use the app
   * YES-12
   * Description:
      * CoS:
         * When the user enters an incorrect email and/or password, the app should tell them it's wrong
         * Verify it works for email and password
* As a registered user, I want to be able to sign out of my account so that I can log into a different/same account
   * YES-14
   * Description:
      * CoS:
         * Make sure the user cannot access any other page except login after signing out
         * Redirect the user back to the login page
         * Make sure they can log in to a different account after signing out
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
         * Satisfy the CoS of each of the subtasks:
         * As a registered user, I want to select a profile picture so that I can express who I am
         * As a registered user, I want to fill in an About section so that I can tell people about myself
         * As a registered user, I want to set a status, so that other people can see what I’m thinking
         * Create Components for Picture, About, Status in Profile
         * As a registered user, I want to be able to view a profile by clicking on their picture.
* As a registered user, I want to be able to track my ACS so that I can see how credible I am as a sports analyst
   * YES-24
   * Description:
      * CoS:
         * View current score
         * View current tier
* As a registered user, I want to be able to access the different parts of the app from The Zone, so that I can see what the app has to offer.
   * YES-34
   * Description:
      * Open Court, Trivia, Picks & Predictions, Debate accessible from this location
         * goes to a different part of the application
      * Able to access profile, sign out
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
* Team capacity (max amount of user story points the team can take on): 3 large stories (login, signup, The Zone) 13 per person? So 78
Participants:
* Our team: Yes
* TA: Swarup Srini
* Product Owners: Jacob, Warren Ward
Decisions about user stories to be implemented: 
* Prioritize learning the software within the first week
* By the end of the sprint, we should be able to register new accounts, log in, view personal info, and access different parts of the app from the home page (the zone) on the webpage (backend client side for now?)
Task breakdowns: Broken down into multiple subtasks on Jira.
* YES-11 (Sign Up)
   * YES-86 (General information and password hasher)
   * YES-87 (Email/phone number logic)
   * YES-88 (Email confirmation sender)
   * YES-93 (Create front-end components for the form)
   * YES-104 (Http server class to handle requests)
* YES-12 (log in)
   * YES-95 (front end)
   * YES-103 (back end)
* YES-14 (log out)
   * No subtasks
* YES-17 (view profile)
   * YES-96 (front end components)
* YES-20 (edit profile)
   * YES-21 (profile picture)
   * YES-22 (about section)
   * YES-23  (status section)
   * YES-97 (front end components)
   * YES-106 (view profile of other users)
* YES-24  (ACS in profile)
   * YES-98 (front end components)
* YES-34 (The Zone navigation)
   * YES-99 (front end components)
   * YES-102 (main page for routing)
* YES-36 (The Zone back button)
   * YES-100 (front end components)