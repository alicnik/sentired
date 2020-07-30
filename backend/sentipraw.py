import praw

reddit = praw.Reddit(client_id="U-DS71QMvlwZbw",
                     client_secret="h0oe7RWbCxCI1EEllx4uKj806xU",
                     password="X5bnm+m#Dg.h+kp",
                     user_agent="web:com.heroku.sentireddit:v1.0 (by /u/alicnik /u/4kir4s)",
                     username="alicnik")

hot_posts = reddit.subreddit('London').hot(limit=5)





