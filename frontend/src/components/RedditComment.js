import React from 'react'
import { Card, CardHeader, CardContent, Avatar } from '@material-ui/core'
import { randomCage } from '../utils/randomCage'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

const RedditComment = ({ comment }) => {

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={comment.reddit_author_avatar || randomCage()} />}
        title={comment.reddit_author}
        subheader={moment(comment.reddit_created_at).fromNow()}
      />
      <CardContent style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <ReactMarkdown source={comment.body} />
      </CardContent>
    </Card>
  )
}

export default RedditComment