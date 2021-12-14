#Name
lift-trackr

#Overiview
Lift trackr is a fitness based social-media platform aimed at those who want to workout with friends who are in different locations or schedules. Major features will include browing exercises / creating workouts either panned or completed, tracking workout history/progress, earning points for exercising regularly, and competing in group competitions. Flexfeed will use DjangoREST, Vue.js for frameworks; pipenv, django-filter, django.contrib.auth, and pendulum for libraries.

#Features

###UserStories

As a gym goer, I want to record my workouts so I can track my progress

As a gym novice, I want to browse for new workouts with pictures and instructions so I can learn

As someone wanting to build a habit of exercising regularly, I want to earn point for keeping up with my goal so I maintain my motivation

As a fitness enthusiast I want to compete with friends so I can push myself  

As a competitor I want to see where I stand during competitions so I can stay motivated

As a trainer I want to see what workouts people are doing so I can share them with others

As a friend I want to message other friends so I can ask for advice or invite to competitions

As a competitor I want to earn rewards for doing well in a competition so I maintain my motivation

As a user I want to view or post to a bulletin board so I can share advice, workouts, or my progress


###Tasks

Find exercise api
Create workout database
Create exercise detail page
Allow user to search workouts
Allow user to add workouts to current workout
Allow users to build and save workout plans
Allow users to share workout plans
Record history of all completed workouts
Order workout history by date, showing most recent first
Give user streak attribute
Incriment streak score daily
Reset streak if user misses 3 or more days in a week
Create user profile page including: name, picture, streak, awards, and posts
Allow user to search for other users
Allow users to add eachother as friends
Create bulletin board
Allow users to post to bulletin
Only show users posts from friends
Allow user to select exercises, point values (1, 5, 10), guidelines, and date range for competition
Allow user to invite friends to competition
Competition starts when date range is met
Competition ends when date range is met
Create leaderboard for competition
Update user scores when a workout is submitted during competition
Order leaderboard by user score
Show countdown timer for competition
Allow users to send direct messages
Award competition winners with a badge or trophy 
create field to show competitions a user has participated in
create awards for different streak lengths

#Data Model
Exercise  
-Name
-Description
-Image
-Difficulty

User  
-Userame *
-Picture *
-Date Joined *
-Streak *
-Friends
-Awards
-Saved workouts
-Current workout
-Workout history
-Current competition
-Competition history
-Current competition score
-Posts

Competition
-Users
-Workouts
-Points per workout
-Leaderboard
-Award
-Date range
-Bulletin board

Message
-Title
-Body
-Author
-Sender
-Receiver
-Timestamp
-Unread

Award
-Title
-Participants
-Winner
-Competition


#Milestones / Schedule

###1
Projected date - 12/8
-Create user system/ register / login out pages *
-create workout database *
-Save users workout history *
- Users create workout *

###2
Prjected date - 12/13
-Establish many to many rel in users system *
-Allow users to add friends *
-Create profile page *
-Allow users to save reccuring workout *
-Give users streak for submiting workouts 5 days per week


###3 
Projected Date - 12/16
-Create forms to send messages 
-Allow users to share workout plans
-Create bulletin board
-Allow users to post to bulletin board with forms

###4 
Projected Date - 12/24
-Create competition page with inputs for title, date range and friends to invite
-Send invites to users in invite list
-Invite contains link to competition page
-Competition page contains workouts + point values, and inputs for users to enter how many complete
-User scored is calculated and displayed on leaderboard 
-Leaderboard shows users in order by score 
-Leaderboard shows countdown untill competition is over
-Competition winners will get an award/badge for winning
-Other participants will add comp, score, and finishing place to comp history

###5 Post Graduation
-Allow users to add new workouts to database
-Use api to find gyms a given location
-Set api to search a given radius from the request
-Allow users to select a gym to "check in"



