import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import styled, { ThemeContext as StyleContext } from 'styled-components'
import { IconButton, Modal } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import angry from '../assets/angry.svg'
import ecstatic from '../assets/ecstatic.svg'
import happy from '../assets/happy.svg'
import neutral from '../assets/neutral.svg'
import sad from '../assets/sad.svg'
import RedditPostCard from './RedditPostCard'


const Account = () => {

  const { user } = useContext(UserContext)
  const styleTheme = useContext(StyleContext)
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
  const Main = styled.main`
    display: flex;
    flex-direction: column;
  `
  const FlexOuter = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.4);
  `
  const FlexInner = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background-color: white;
    align-items: center;
  `
  const H1 = styled.h1`
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(1.5rem, 4vw, 3rem);
  `
  const H2 = styled.h2`
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(4rem, 10vw, 8rem);
    margin: 0;
  `
  const H3 = styled.h3`
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(1.5rem, 4vw, 3rem);

  `
  const Visibility = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 5px solid #fafafa;
    padding: 1rem;
    margin-bottom: 1rem;
  `

  const Saved = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 5px solid #fafafa;
  padding: 1rem;
  margin-bottom: 1rem;
`


  return (
    <Main>
      <FlexOuter>
        <Image src={emojis[user.emotion]} alt={user.emotion} />
        <FlexInner>
          <H1>{user.username}</H1>
          <H2>{user.aggregate_sentiment && Math.round(user.aggregate_sentiment * 100)}</H2>
          <span>What&apos;s this number &nbsp;</span>
          <IconButton onClick={handleOpen}>
            <HelpOutlineIcon />
          </IconButton>
        </FlexInner>
      </FlexOuter>
      <Visibility>
        <H3>Viewed Posts</H3>
        <VisibilityRoundedIcon style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }} />
      </Visibility>
      {user.viewed_posts?.map((post, i) => <RedditPostCard key={i} post={post} />)}
      <Saved>
        <H3>Saved Posts</H3>
        <BookmarkBorderIcon style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }} />
      </Saved>
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
          <p>This is the amount of positive or negative sentiment you&apos;ve been exposed to in all of the Reddit posts and comments you&apos;ve read.</p>
        </ModalDiv>
      </Modal>
    </Main>
  )
}


export default Account