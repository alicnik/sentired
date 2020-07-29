import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import rorschach from '../assets/Rorschach.mp4'


const schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Please enter your email address'),
  password: Yup.string().required('Please enter  password')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
})

const Login = () => {

  const history = useHistory()
  const { login } = useContext(UserContext)
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all'
  })

  const onSubmit = (data) => {
    axios.post('/api/login', data)
      .then(resp => {
        console.log(resp)
        login(resp.data)
        history.push('/home')
      })
      .catch(err => {
        console.log(err.response)
        Object.entries(err.response.data.errors).forEach(([errorField, errorMessage]) => {
          setError(errorField, { message: errorMessage })
        })
      })
  }

  const BackgroundVideo = styled.video`
    min-height: 100vh;
    min-width: 100vh;
    position: absolute;
    top: 0;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%);
    z-index: -1;
  `

  const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30vh;
    justify-content: space-around;  
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <main>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          inputRef={register}
          label="Email"
          type="email"
          variant="outlined"
        />
        <span>{errors.email?.message}</span>
        <TextField
          name="password"
          inputRef={register}
          label="Password"
          type="password"
          variant="outlined"
        />
        <span>{errors.password?.message}</span>
        <Button type="submit" variant="outlined" color="primary">Submit</Button>
      </StyledForm>
      <BackgroundVideo autoPlay muted loop>
        <source src={rorschach} type="video/mp4" />
      </BackgroundVideo>
    </main>
  )

}

export default Login