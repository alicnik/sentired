import React from 'react'
import { Card, CardHeader, CardContent, Avatar } from '@material-ui/core'

const RedditComment = ({ comment }) => {

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={comment.reddit_author_avatar} />}
        title={comment.reddit_author}
      />
      <CardContent>
        <p>{comment.body}</p>
      </CardContent>
    </Card>
  )
}

export default RedditComment