import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { UserContext } from './UserContext'
import styled from 'styled-components'
import sentiredditlogo from '../assets/sentiredditlogo.png'


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
  const Image = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -100;
    
  `

  // User Context will look for token in local storage and automatically sign user in if token is found.
  // Guard clause here to forward user to homepage if they are already logged in.
  if (user.isLoggedIn) {
    history.push('/home')
  }

  return <main>
    <Container>
      <Button variant="outlined" onClick={handleOpen}>About</Button>
      <Link to="/register"><Button variant="outlined">Register</Button></Link>
      <Link to="/login"><Button variant="outlined">Login</Button></Link>
    </Container>
    <Image src={sentiredditlogo} style={{ width: '60vw', height: '60vw' }} usemap='#map' />
    <map name="map">
      <area shape="poly" coords="74,0,113,29,98,72,52,72,38,27"
        href="/perl/index.htm" alt="Perl Tutorial" target="_blank" />
    </map>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <h2>
        About
      </h2>
    </Modal>
  </main>
}

export default Welcome