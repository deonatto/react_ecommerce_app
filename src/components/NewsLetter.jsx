import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div `
    height: 60vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fcf5f5;
    flex-direction: column;
`

const Title = styled.h1 `
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({
        fontSize: "50px",
    })}
`

const Desc = styled.p `
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({
        fontSize: "20px",
        textAlign: "center"
    })}
`

const InputContainer = styled.div `
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
`;

const Input = styled.input `
    border: none;
    flex: 8;
    padding-left: 20px;
    ${mobile({
        paddingLeft: "6px",
    })}
`;

const Button = styled.button `
    flex: 1;
    border: none;
    color: white;
    background-color: teal;
    cursor: pointer;
`;

const NewsLetter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get timely updates from your favorite products.</Desc>
            <InputContainer>
                <Input placeholder = "Your email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
            
        </Container>
    )
}

export default NewsLetter;
