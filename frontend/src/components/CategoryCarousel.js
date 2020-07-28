import React from 'react'
import styled from 'styled-components'

const CategoryCarousel = () => {

  return (
    <CarouselContainer>
      <CarouselItem>HOT</CarouselItem>
      <CarouselItem>NEW</CarouselItem>
      <CarouselItem>RISING</CarouselItem>
      <CarouselItem>TOP</CarouselItem>
      <CarouselItem>CONTROVERSIAL</CarouselItem>
    </CarouselContainer>
  )

}

export default CategoryCarousel

const CarouselContainer = styled.div`
  width: 80%;
  display: flex;
  overflow-x: scroll;
  margin: 0 auto;
  position: relative;
  height: min-content;
`
  
// const ContainerShadow = styled.div`
//   box-shadow: 5px 0 5px 3px inset rgba(255, 255, 255, 0.5);
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: transparent;
// `

const CarouselItem = styled.button`
  border: 1px solid black;
  border-radius: 0;
  margin: 0.5rem 1rem;
  text-transform: uppercase;
  background: none;
`