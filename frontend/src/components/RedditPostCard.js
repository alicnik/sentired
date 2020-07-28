import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, Avatar, CardMedia, CardContent } from '@material-ui/core'
import { randomCage } from '../utils/randomCage'


const RedditPostCard = ({ post }) => {

  return (
    <Link to={`/posts/${post.id}`}>
      <Card>
        <CardHeader
          avatar={
            <Avatar src={randomCage()} />
          }
          title={post.subreddit_name_prefixed || post.subreddit}
          subheader={post.author || post.reddit_author}
        />
        {post.thumbnail !== 'self' &&
          <CardMedia
            image={post.thumbnail || (!post.media?.includes('mp4') && post.media) || randomCage()}
            style={{ height: '20vh', width: '30vw' }}
          />
        }
        <CardContent>
          <h2>{post.title}</h2>
        </CardContent>
      </Card>
    </Link>
  )
}

export default RedditPostCard