import React from 'react'
import styled from 'styled-components'


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30vh;
  min-width: 300px;
  justify-content: space-around;  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  mix-blend-mode: difference;
  z-index: 2;
`

export const StyledForm = (props) => {

  return ( 
    <Form {...props}>
      {props.children}
    </Form>
  )
}