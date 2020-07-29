import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { randomCage } from '../utils/randomCage'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

const RedditPostCard = ({ post, loading = false }) => {

  const { pathname } = useLocation()

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
        { loading ?
          (<Skeleton variant="rect" width="40%" height="150px" style={{ float: 'left' }}/>) :
          (post.thumbnail !== 'self' && post.thumbnail !== 'spoiler' && post.thumbnail !== 'default' && <CardMedia
            image={post.thumbnail || (!post.media?.includes('mp4') && post.media) || randomCage()}
            style={{ height: '20vh', width: '30vw', float: 'left', marginRight: 20 }}
          />)
        }
        <CardContent>
          {loading ? 
            (Array(4).fill(0).map((e,i) => <Skeleton key={i} height={10} width="30%" style={{ marginBottom: 6 }} />)) : 
            (<h2>{post.title}</h2>)}
        </CardContent>
      </Card>
    </Link>
  )
}

export default RedditPostCard