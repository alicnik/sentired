import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'


const Welcome = () => {

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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