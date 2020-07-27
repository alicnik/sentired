import React from 'react'
import moment from 'moment'
moment().format() 

import { Card, CardHeader, CardContent, Avatar } from '@material-ui/core'

const SentiRedditComment = ({ comment }) => {

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={comment.user.avatar} />}
        title={comment.user.username}
        subheader={moment(comment.created_at).fromNow()}
      />
      <CardContent>
        <p>{comment.body}</p>
      </CardContent>
    </Card>
  )
}

export default SentiRedditComment

