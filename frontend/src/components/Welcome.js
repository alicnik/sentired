import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { UserContext } from './UserContext'


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

  // User Context will look for token in local storage and automatically sign user in if token is found.
  // Guard clause here to forward user to homepage if they are already logged in.
  if (user.isLoggedIn) {
    history.push('/home')
  }

  return <main>
    <Button variant="outlined" onClick={handleOpen}>About</Button>
    <Link to="/register"><Button variant="outlined">Register</Button></Link>
    <Link to="/login"><Button variant="outlined">Login</Button></Link>
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