import React from 'react'
import styled from 'styled-components'
import angry from '../assets/angry.svg'
import ecstatic from '../assets/ecstatic.svg'
import happy from '../assets/happy.svg'
import neutral from '../assets/neutral.svg'
import sad from '../assets/sad.svg'

import getEmotion from '../utils/getEmotion'


const ProgressBar = () => {

  const user = {
    sentiment: -1.5
  }

  const userEmotion = getEmotion(user.sentiment)

  const positions = {
    angry: '0%',
    sad: '25%',
    neutral: '50%',
    happy: '75%',
    ecstatic: '100%'
  }

  const emotions = {
    angry,
    sad,
    neutral,
    happy,
    ecstatic
  }

  const ProgressContainer = styled.div`
  width: 60%;
  background-image: linear-gradient(0.25turn, #ff0000, #13273e, beige, green, orange, yellow, pink);
  position: relative;
  height: 25px;
`
  const Image = styled.img`
  position: absolute;
  height: 40px;
  width: 40px;
  top: 50%;
  left: ${positions[userEmotion]};
  transform: translate(-50%, -50%);
`
  return (
    <ProgressContainer>
      <Image src={emotions[userEmotion]} />
    </ProgressContainer>
  )
}

export default ProgressBar

