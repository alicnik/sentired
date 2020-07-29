import React from 'react'
import styled from 'styled-components'

const CategoryCarousel = ({ handleCategory }) => {

  const categories = ['hot', 'new', 'rising', 'top', 'controversial']

  const CarouselContainer = styled.div`
    width: 80%;
    display: flex;
    overflow-x: scroll;
    margin: 2rem 0;
    position: relative;
    height: min-content;
  `

  const CarouselItem = styled.button`
    border: 1px solid grey;
    border-radius: 0;
    margin: 0.5rem 1rem;
    text-transform: uppercase;
    background: #fafafa;
    padding: 0.5rem 1rem;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.color}
  `

  return (
    <CarouselContainer>
      {categories.map((category, i) => (
        <CarouselItem key={i} value={category} onClick={handleCategory}>{category}</CarouselItem>
      ))}
    </CarouselContainer>
  )

}

export default CategoryCarousel