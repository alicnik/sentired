import React from 'react'
import styled from 'styled-components'

const CategoryCarousel = ({ handleCategory }) => {

  const categories = ['hot', 'new', 'rising', 'top', 'controversial']

  const CarouselContainer = styled.div`
    width: 80%;
    display: flex;
    overflow-x: scroll;
    margin: 0 auto;
    position: relative;
    height: min-content;
  `

  const CarouselItem = styled.button`
    border: 1px solid black;
    border-radius: 0;
    margin: 0.5rem 1rem;
    text-transform: uppercase;
    background: none;
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