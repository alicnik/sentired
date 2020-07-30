import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { UserContext } from './UserContext'
import styled from 'styled-components'

const Welcome = () => {

  const { user } = useContext(UserContext)
  const [open, setOpen] = React.useState(false)
  const history = useHistory()


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Container = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  `
  const WelcomeLogo = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -100;
    width: clamp(700px, 50vw, 900px);
    height: clamp(700px, 50vw, 900px);
  `

  const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
    background-color: #000;
    padding: 1rem;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    outline: none !important;
    border-radius: 50px;
    color: #FF4500;
    font-family: 'Poppins', sans-serif;
   `
  
  const H1 = styled.h1`
     margin: auto;
     padding: 1rem;
     text-align: center;
     font-size: clamp(4rem, 5vw, 8rem);
     font-family: 'Poppins', sans-serif;
     color: #FF4500;
   `

  const H2 = styled.h2`
    margin: 0.2rem 0rem 0.2rem 0rem;
    border-bottom: 1px solid #FF4500;
    text-align: center;
    width: 100%;
    
  `
  const Paragraph = styled.p`
    text-align: center;

      
 `


  // User Context will look for token in local storage and automatically sign user in if token is found.
  // Guard clause here to forward user to homepage if they are already logged in.
  if (user.isLoggedIn) {
    history.push('/home')
  }

  return <main>
    <H1> SentiReddit</H1>
    <Container>
      <WelcomeLogo width="342" height="342" viewBox="0 0 342 342" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Reddit_Mark_OnWhite 1">
          <g id="Artwork">
            <g id="Group">
              <path id="Vector" d="M170.9 256.4C218.12 256.4 256.4 218.12 256.4 170.9C256.4 123.68 218.12 85.4 170.9 85.4C123.68 85.4 85.4 123.68 85.4 170.9C85.4 218.12 123.68 256.4 170.9 256.4Z" fill="#FF4500" />
              <path id="Vector_2" d="M227.9 170.9C227.9 164 222.3 158.4 215.4 158.4C212 158.4 209 159.7 206.8 161.9C198.3 155.8 186.5 151.8 173.5 151.3L179.2 124.6L197.7 128.5C197.9 133.2 201.8 137 206.6 137C211.5 137 215.5 133 215.5 128.1C215.5 123.2 211.5 119.2 206.6 119.2C203.1 119.2 200.1 121.2 198.7 124.2L178 119.8C177.4 119.7 176.8 119.8 176.3 120.1C175.8 120.4 175.5 120.9 175.3 121.5L169 151.3C155.7 151.7 143.8 155.6 135.2 161.9C133 159.8 129.9 158.4 126.6 158.4C119.7 158.4 114.1 164 114.1 170.9C114.1 176 117.1 180.3 121.5 182.3C121.3 183.5 121.2 184.8 121.2 186.1C121.2 205.3 143.5 220.8 171.1 220.8C198.7 220.8 221 205.3 221 186.1C221 184.8 220.9 183.6 220.7 182.4C224.8 180.4 227.9 176 227.9 170.9ZM142.4 179.8C142.4 174.9 146.4 170.9 151.3 170.9C156.2 170.9 160.2 174.9 160.2 179.8C160.2 184.7 156.2 188.7 151.3 188.7C146.4 188.7 142.4 184.7 142.4 179.8ZM192.1 203.3C186 209.4 174.4 209.8 171 209.8C167.6 209.8 155.9 209.3 149.9 203.3C149 202.4 149 200.9 149.9 200C150.8 199.1 152.3 199.1 153.2 200C157 203.8 165.2 205.2 171.1 205.2C177 205.2 185.1 203.8 189 200C189.9 199.1 191.4 199.1 192.3 200C193 201 193 202.4 192.1 203.3ZM190.5 188.7C185.6 188.7 181.6 184.7 181.6 179.8C181.6 174.9 185.6 170.9 190.5 170.9C195.4 170.9 199.4 174.9 199.4 179.8C199.4 184.7 195.4 188.7 190.5 188.7Z" fill="white" />
            </g>
          </g>
          <circle onClick={() => history.push('/login')} style={{ cursor: 'pointer' }} id="left-eye" cx="151.5" cy="179.5" r="9.5" fill="#FF4500" />
          <circle onClick={() => history.push('/register')} style={{ cursor: 'pointer' }} id="right-eye" cx="190.5" cy="179.5" r="9.5" fill="#FF4500" />
          <circle onClick={handleOpen} style={{ cursor: 'pointer' }} id="antenna" cx="206.5" cy="128.5" r="9.5" fill="white" />
        </g>
      </WelcomeLogo>
    </Container>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <AboutContainer>
        <H2>
          ABOUT
        </H2>
        <Paragraph>SentiReddit is a wrapper for Reddit which tracks your sentiment using machine learning and language. Journey through SentiReddit and keep an eye on the UI!</Paragraph>
      </AboutContainer>
    </Modal>
  </main>
}



export default Welcome