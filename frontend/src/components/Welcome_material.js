import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

import { UserContext } from './UserContext'

const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
     padding: 1rem;
     text-align: center;
     font-size: clamp(3rem, 8vw, 6rem);
     font-family: 'Poppins', sans-serif;
     color: #FF4500;
     margin: 5vh 0 1rem;
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

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
    background-color: #fff;
    padding: 1rem;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    outline: none !important;
    border-radius: 10px;
    color: #0f0f0f;
    font-family: 'Poppins', sans-serif;
   `

export default function Welcome() {

  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (user.isLoggedIn) {
    history.push('/home')
  }

  return (
    <Main>
      <H1>SentiRed</H1>
      
      <Button size='large' style={{ width: '8rem', margin: '1rem' }} color='primary' onClick={handleOpen}>
      About
      </Button>
      <Button size='large' style={{ width: '8rem', margin: '1rem' }} color='primary' variant='contained' onClick={() => history.push('/login')}>
      Log In
      </Button>
      <Button size='large' style={{ width: '8rem', margin: '1rem' }} color='primary' variant='outlined' onClick={() => history.push('/register')}>
      Register
      </Button>


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
          <Paragraph>SentiReddit is a wrapper for Reddit which tracks your sentiment using machine learning and language. Journey through SentiRed and keep an eye on the UI!</Paragraph>
        </AboutContainer>
      </Modal>
    </Main>
  )
}