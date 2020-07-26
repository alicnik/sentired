import random
from functools import reduce


def random_cage():
    sizes = [200, 250, 300, 350, 400]
    return f'https://www.placecage.com/c/{random.choice(sizes)}/{random.choice(sizes)}'


# Define function to calculate aggregate sentiment score for a user. Reduces all user_sentiments as held in
# user_sentiments join table to an overall sentiment score. Uses reduce to iterate through the user.user_sentiments list.
# sentiment_sum function is used in the reducer, if/else logic therein accounts for the different arguments that will be passed in
# depending on whether it is two Sentiment objects being added together, in which case the .score property is needed, or
# whether is it the reduce accumulator, which will be a float and therefore has no .score property.

def calculate_user_aggregate_sentiment(user):
    def sentiment_sum(a, b):
        if getattr(a, 'score', None):
            return a.score + b.score
        else:
            return a + b.score
    user.aggregate_sentiment = reduce(sentiment_sum, user.user_sentiments)
