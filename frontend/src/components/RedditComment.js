import React from 'react'
import { Card, CardHeader, CardContent, Avatar } from '@material-ui/core'
import { randomCage } from '../utils/randomCage'

const RedditComment = ({ comment }) => {

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={comment.reddit_author_avatar || randomCage()} />}
        title={comment.reddit_author}
      />
      <CardContent>
        <p>{comment.body}</p>
      </CardContent>
    </Card>
  )
}

export default RedditComment