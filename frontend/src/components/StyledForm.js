import React from 'react'
import styled from 'styled-components'

export const StyledForm = (props) => {

  const StyledForm = styled.form`
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
  `
  
  return ( 
    <StyledForm {...props}>
      {props.children}
    </StyledForm>
  )
}