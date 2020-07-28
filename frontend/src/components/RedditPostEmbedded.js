import React, { useContext } from 'react'
import { Card, CardHeader, Avatar, CardMedia, CardContent, IconButton } from '@material-ui/core'
import { randomCage } from '../utils/randomCage'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { UserContext } from './UserContext'
import axios from 'axios'

const RedditPostEmbedded = ({ post, token, setPostWithComments }) => {

  const { user, updateUser } = useContext(UserContext)

  const handleFavourite = () => {
    axios.put(`/api/users/${user.id}/saved`,
      { 'redditId': post.reddit_id },
      { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        updateUser()
        setPostWithComments(res.data)
      })
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={randomCage()} />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={handleFavourite}
          >
            {user.saved_posts.some(savedPost => post.id === savedPost.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        }
        title={`r/${post.subreddit}`}
        subheader={post.reddit_author}
      />
      <CardContent>
        <h2>{post.title}</h2>
      </CardContent>
      <CardMedia
        component={RegExp(/(placecage|.(jpe?g|png|gif|svg)$)/).test(post.media) ? 'img' : 'video'}
        src={post.media}
        style={{ height: '20vh', width: '30vw' }}
      />
      <CardContent>
        <p>{post.selftext}</p>
      </CardContent>
    </Card>
  )
}

export default RedditPostEmbedded