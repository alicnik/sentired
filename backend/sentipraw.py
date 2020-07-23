import praw

reddit = praw.Reddit(client_id="U-DS71QMvlwZbw",
                     client_secret="h0oe7RWbCxCI1EEllx4uKj806xU",
                     password="X5bnm+m#Dg.h+kp",
                     user_agent="web:com.heroku.sentireddit:v1.0 (by /u/alicnik /u/4kir4s)",
                     username="alicnik")

# print(reddit.user.me())

hot_posts = reddit.subreddit('London').hot(limit=5)

# for post in hot_posts:
#   print(post.id)

# for submission in reddit.subreddit("all").controversial(limit=5):
#   print(submission.id)

# for submission in reddit.subreddit('London').top(limit=10):
#     print(submission.url)

# submission = reddit.submission(id='284ul2')
# print(submission.url)



