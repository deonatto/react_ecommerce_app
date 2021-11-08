import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { loginFailure, loginSuccess } from "../redux/userRedux";
import { mobile } from "../responsive";
import {useDispatch, useSelector} from 'react-redux';

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
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({
        width: "70%"
    })}
`;

const Form = styled.form `
    display: flex;
    flex-direction: column;
    margin: 20px 0px;

`;

const Title = styled.h1 `
    font-size: 24px;
    font-weight: 300;

`;

const Input = styled.input `
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button `
    width: 40%;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    padding: 15px 20px;

`;


const Error = styled.span `
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const error = useSelector((state)=> state.user.error);
    const dispatch = useDispatch();

    //login function
    const handleClick = async (e) =>{
        e.preventDefault(); 
        try{
            const response = await axios.post("https://jesus-react-ecommerce.herokuapp.com/api/auth/login", {
                username: username,
                password: password
            });
            dispatch(loginSuccess(response.data));
        }catch(err){
            console.log(err);
            dispatch(loginFailure());
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input onChange = {(e)=> setUsername(e.target.value)} required placeholder= "username"/>
                    <Input type="password" onChange = {(e)=> setPassword(e.target.value)} required placeholder= "password"/>
                    <Button onClick = {handleClick}>LOGIN</Button>
                    {error && <Error>Something went wrong</Error>}
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;
