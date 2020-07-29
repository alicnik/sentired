import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import angry from '../assets/angry.svg'
import ecstatic from '../assets/ecstatic.svg'
import happy from '../assets/happy.svg'
import neutral from '../assets/neutral.svg'
import sad from '../assets/sad.svg'

import { UserContext } from './UserContext'


const ProgressBar = () => {

  const { pathname } = useLocation()
  const { user } = useContext(UserContext)

  if (pathname.includes('account')) return <h4>{user.username}</h4>

  const emotions = {
    angry: { emoji: angry, position: '0%' },
    sad: { emoji: sad, position: '25%' },
    neutral: { emoji: neutral, position: '50%' },
    happy: { emoji: happy, position: '75%' },
    ecstatic: { emoji: ecstatic, position: '100%' }
  }

  const ProgressContainer = styled.div`
    width: 60%;
    background-image: linear-gradient(0.25turn, #400000, #BF0000, #0071B6, #626665, #fff600, #B6C61A, #4CBB17);
    position: relative;
    height: 25px;
  `
  const Image = styled.img`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 50%;
    left: ${emotions[user.emotion]?.position};
    transform: translate(-50%, -50%);
  `
  return (
    <ProgressContainer>
      <Image src={emotions[user.emotion]?.emoji} />
    </ProgressContainer>
  )
}

export default ProgressBar

