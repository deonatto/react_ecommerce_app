import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div `
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), 
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({
        flexDirection: "column"
    })}
`;

const Wrapper = styled.div `
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({
        width: "78%",
        height: "78%",
        overflowY: "scroll"
    })}
`;

const Form = styled.form `
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px;
    ${mobile({
        flexDirection: "column",
        margin: "2px 0px"
    })}

`;

const Title = styled.h1 `
    font-size: 24px;
    font-weight: 300;

    ${mobile({
        fontSize: "20px"
    })}

`;

const Input = styled.input `
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;

    ${mobile({
        margin: "5px 0px"
    })}
`;

const Button = styled.button `
    width: 40%;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    padding: 15px 20px;
    
`;

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder= "name"/>
                    <Input placeholder= "last name"/>
                    <Input placeholder= "username"/>
                    <Input type="email" placeholder= "email"/>
                    <Input type= "password" placeholder= "password"/>
                    <Input type= "password" placeholder= "confirm password"/>
                </Form>
                <Button>CREATE</Button>
            </Wrapper>
        </Container>
    )
}

export default Register;
