import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { randomCage } from '../utils/randomCage'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'
import styled from 'styled-components'


const RedditPostCard = ({ post, loading = false }) => {
  
  const { pathname } = useLocation()

  const H2 = styled.h2`
    margin-left: 20px;
    font-size: clamp(1rem, 3vw, 1.5rem);
  `

  // Link uses ternary so that component can be reused on account page where post.id will refer to SQL db, 
  // unlike usage on homepage where reddit API call response will return a reddit identification code for post.id
  
  return (
    <Link to={`/posts/${pathname.includes('account') ? post.reddit_id : post.id}`}>
      <Card>
        <CardHeader
          avatar={
            loading ?
              (<Skeleton variant="circle" width={40} height={40} />) :
              (<Avatar src={randomCage()} />)
          }
          title={loading ? 
            (<Skeleton height={10} width="30%" style={{ marginBottom: 6 }} />) :
            (post.subreddit_name_prefixed || post.subreddit)}
          subheader={loading ? 
            (<Skeleton height={10} width="30%" style={{ marginBottom: 6 }} />) :
            (post.author || post.reddit_author)}
        />
        <CardContent>
          { loading ?
            (<Skeleton variant="rect" width="40%" height="150px" style={{ float: 'left' }}/>) :
            ( ((/\.(png|jpe?g|gif)$/).test(post?.thumbnail) || post.media) && 
            <CardMedia
              image={post.thumbnail || (!post.media?.includes('mp4') && post.media) || randomCage()}
              style={{ width: '20vw', height: '20vw', minHeight: 150, minWidth: 150, backgroundSize: 'contain' }}
            />)
          }
          {loading ? 
            (Array(4).fill(0).map((e,i) => <Skeleton key={i} height={10} width="30%" style={{ marginBottom: 6 }} />)) : 
            (<H2>{post.title}</H2>)}
        </CardContent>
      </Card>
    </Link>
  )
}

export default RedditPostCard