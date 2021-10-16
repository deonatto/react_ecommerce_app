import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import {sliderItems} from '../data';
import { mobile } from '../responsive';

const Container = styled.div `
    height: 100vh;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
        display: "none",
    })}
    
`;

const Arrow = styled.div `
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;

`;

const Wrapper = styled.div `
    height: 100%;
    width: 100%;
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}%);
    transition: all 1.5s ease;
    
`;

const Slide = styled.div `
    min-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
`;

const ImgContainer = styled.div `
    height: 100%;
    flex: 1;
`;
const Image = styled.img `
    height: 80%;
`;

const InfoContainer = styled.div `
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1 `
    font-size: 70px;
`;

const Desc = styled.p `
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
`;

const Button = styled.button `
    padding: 10px;
    font-size: 20px;
    cursor: pointer; 
    background-color: transparent;
`;

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) =>{
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2 );
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }
    }

    return (
        <Container>
            <Arrow direction = "left" onClick = {()=> handleClick("left")}>
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideIndex = {slideIndex}>
                {sliderItems.map(slide=>(
                    <Slide key = {slide.id} bg = {slide.bg}>
                        <ImgContainer>
                            <Image src = {slide.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{slide.title}</Title>
                            <Desc>{slide.desc}</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>

                    </Slide>
                ))}
                
            </Wrapper>
            <Arrow direction = "right" onClick = {()=> handleClick("right")}>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider;
