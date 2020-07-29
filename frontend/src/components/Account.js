import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components'

import { IconButton, Modal } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import angry from '../assets/angry.svg'
import ecstatic from '../assets/ecstatic.svg'
import happy from '../assets/happy.svg'
import neutral from '../assets/neutral.svg'
import sad from '../assets/sad.svg'
import RedditPostCard from './RedditPostCard'


const Account = () => {

  const { user } = useContext(UserContext)
  const [open, setOpen] = React.useState(false)
  const emojis = { angry, happy, sad, neutral, ecstatic }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Image = styled.img`
    width: 30vw;
  `

  const ModalDiv = styled.div`
    background-color: whitesmoke;
    padding: 1rem;
  `

  return (
    <main>
      <Image src={emojis[user.emotion]} alt={user.emotion}/>
      <h1>{user.username}</h1>
      <h2>{Math.round(user.aggregate_sentiment * 100)}</h2>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <h3>Viewed Posts</h3>
      {user.viewed_posts?.map((post, i) => <RedditPostCard key={i} post={post} />)}
      <h3>Saved Posts</h3>
      {user.saved_posts?.map((post, i) => <RedditPostCard key={i} post={post} />)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDiv>
          <h2>Sentiment Score</h2>
          <p>This is what I am talking about at the moment.</p>
        </ModalDiv>
      </Modal>
    </main>
  )
}


export default Account