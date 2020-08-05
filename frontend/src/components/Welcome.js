import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { UserContext } from './UserContext'
import styled from 'styled-components'

const Welcome = () => {

  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [hoverTarget, setHoverTarget] = useState(' ')
  const history = useHistory()


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  `

  const H1 = styled.h1`
     padding: 1rem;
     text-align: center;
     font-size: clamp(3rem, 5vw, 8rem);
     font-family: 'Poppins', sans-serif;
     color: #FF4500;
     margin: 5vh 0 1rem;
   `

  const H2 = styled.h2`
    padding: 1rem;
    text-align: center;
    font-size: clamp(3rem, 5vw, 8rem);
    font-family: 'Poppins', sans-serif;
    color: #FF4500;
    margin: 1rem;
  `

  const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
    background-color: #000;
    padding-top: 1rem;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    outline: none !important;
    border-radius: 50px;
    color: #FF4500;
    font-family: 'Poppins', sans-serif;
   `

  const H3 = styled.h3`
    margin: 0.2rem 0rem 0.2rem 0rem;
    border-bottom: 1px solid #FF4500;
    padding-bottom: 1rem;
    text-align: center;
    width: 100%;
    
  `
  const Paragraph = styled.p`
    text-align: center;
    padding: 0 1rem 0.8rem;
     
 `

  // User Context will look for token in local storage and automatically sign user in if token is found.
  // Guard clause here to forward user to homepage if they are already logged in.
  if (user.isLoggedIn) {
    history.push('/home')
  }

  return <main style={{ height: '100%', width: '100%' }}>
    <Container>
      <H1>SentiRed</H1>
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171 171" style={{ maxWidth: 400, maxHeight: 400 }}>
        <g id="Artwork">
          <circle fill="#ff4500" cx="85.5" cy="85.5" r="85.5" />
          <path fill="#fff" d="M142.5,85.5A12.5,12.5,0,0,0,130,73h0a12,12,0,0,0-8.6,3.5c-8.5-6.1-20.3-10.1-33.3-10.6l5.7-26.7,18.5,3.9a8.9,8.9,0,1,0,8.9-9.3,8.66,8.66,0,0,0-7.9,5L92.6,34.4a2.28,2.28,0,0,0-2.7,1.7L83.6,65.9c-13.3.4-25.2,4.3-33.8,10.6A12.47,12.47,0,1,0,36.1,96.9a24.23,24.23,0,0,0-.3,3.8c0,19.2,22.3,34.7,49.9,34.7s49.9-15.5,49.9-34.7a22.89,22.89,0,0,0-.3-3.7A12.94,12.94,0,0,0,142.5,85.5ZM57,94.4a8.9,8.9,0,1,1,8.9,8.9h0A8.92,8.92,0,0,1,57,94.4Zm49.7,23.5c-6.1,6.1-17.7,6.5-21.1,6.5s-15.1-.5-21.1-6.5a2.33,2.33,0,0,1,3.3-3.3c3.8,3.8,12,5.2,17.9,5.2s14-1.4,17.9-5.2a2.35,2.35,0,0,1,3.3,0,2.57,2.57,0,0,1-.2,3.3Zm-1.6-14.6a8.9,8.9,0,1,1,8.9-8.9h0a8.92,8.92,0,0,1-8.9,8.9Z" />
        </g>
        <circle onMouseEnter={() => setHoverTarget('Login')} onMouseLeave={() => setHoverTarget(' ')} onClick={() => history.push('/login')} id="left-eye" fill="#ff4500" style={{ cursor: 'pointer' }} cx="65.9" cy="94.4" r="8.9" />
        <circle onMouseEnter={() => setHoverTarget('Register')} onMouseLeave={() => setHoverTarget(' ')} onClick={() => history.push('/register')} id="right-eye" fill="#ff4500" style={{ cursor: 'pointer' }} cx="105.1" cy="94.4" r="8.9" />
        <circle onMouseEnter={() => setHoverTarget('About')} onMouseLeave={() => setHoverTarget(' ')} onClick={handleOpen} id="antenna" fill="#fff" style={{ cursor: 'pointer' }} cx="120.93" cy="42.7" r="8.9" />
      </svg>
      <H2>{hoverTarget}</H2>
    </Container>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <AboutContainer>
        <H3>
          About
        </H3>
        <Paragraph>SentiReddit is a wrapper for Reddit which tracks your sentiment using machine learning and language. Journey through SentiReddit and keep an eye on the UI!</Paragraph>
      </AboutContainer>
    </Modal>
  </main>
}



export default Welcome