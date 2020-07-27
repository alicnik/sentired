import React from 'react'
import { Card, CardHeader, Avatar, CardMedia, CardContent } from '@material-ui/core'
import { randomCage } from '../utils/randomCage'


const RedditPostCard = ({ post }) => {

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={randomCage()} />
        }
        title={`r/${post.subreddit}`}
        subheader={post.reddit_author}
      />
      <CardContent>
        <h2>{post.title}</h2>
      </CardContent>
      <CardMedia 
        component={RegExp(/.(jpe?g|png|gif|svg)$/).test(post.media) ? 'img' : 'video'} 
        src={post.media} 
        style={{ height: '20vh', width: '30vw' }} 
      />
      <CardContent>
        <p>{post.selftext}</p>
      </CardContent>
    </Card>
  )
}

export default RedditPostCard