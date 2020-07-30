import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { StyledForm } from './StyledForm'
import { BackgroundVideo } from './BackgroundVideo'

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

  return (
    <main style={{ overflow: 'hidden' }}>
      <h2 style={{
        fontSize: '4rem',
        color: 'white',
        margin: '0 auto',
        textAlign: 'center',
        lineHeight: '30vh',
        letterSpacing: '0.1rem',
        fontFamily: '"Nanum Myeongjo", serif'
      }}>LOG &nbsp;IN</h2>
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
        <Button type="submit" variant="outlined">Submit</Button>
      </StyledForm>
      <BackgroundVideo/>
    </main>
  )

}

export default Login


