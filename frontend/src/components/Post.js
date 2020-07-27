import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import RedditPostEmbedded from './RedditPostEmbedded'
import RedditComment from './RedditComment'


const Post = () => {

  const { pathname } = useLocation()
  const [postWithComments, setPostWithComments] = useState([])
  const redditId = pathname.match(/posts\/(\w+)$/)[1]
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/posts/${redditId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(initialResponse => {
        setPostWithComments(initialResponse.data)
        return initialResponse
      })
      .then(initialResponse => {
        if (initialResponse.data.reddit_author_avatar && initialResponse.data.reddit_comments.every(comment => comment.reddit_author_avatar)) return initialResponse
        axios.get(`/api/posts/${redditId}/avatars`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(avatarResponse => {
            setPostWithComments(avatarResponse.data)
            return initialResponse
          })
          .catch(err => console.log(err))
      })
      .then(initialResponse => {
        if (initialResponse.data.sentiment && initialResponse.data.reddit_comments.every(comment => comment.sentiment)) return
        axios.get(`api/posts/${redditId}/sentiment`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(sentimentResponse => setPostWithComments(sentimentResponse.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  if (postWithComments.length === 0) return null

  return (
    <main>
      <section className="post">
        <RedditPostEmbedded post={postWithComments} />
      </section>
      <section className="reddit-comments">
        {postWithComments.reddit_comments.map((comment, i) => <RedditComment key={i} comment={comment} />)}
      </section>
      <section className="sentireddit-comments">
      
      </section>
    </main>
  )








}

export default Post