import React from 'react'
import styled from 'styled-components'

const CategoryCarousel = ({ handleCategory }) => {

  const categories = ['hot', 'new', 'rising', 'top', 'controversial']

  const CarouselContainer = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    overflow-x: scroll;
    margin: 2rem 0;
    position: relative;
    height: min-content;

    &::-webkit-scrollbar {
      display: none;
    }
  `

  const CarouselItem = styled.button`
    border-radius: ${props => props.theme.borderRadius};
    border: none;
    margin: 0.5rem 1rem;
    text-transform: uppercase;
    background: #fafafa;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.color};
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.4);
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