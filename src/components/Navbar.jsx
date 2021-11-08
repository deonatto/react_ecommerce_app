import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { mobile } from '../responsive';
import {useSelector,useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logout} from "../redux/userRedux";


const Container = styled.div `
    height: 60px; 
    width:100%;
    ${mobile({
        height: "50px",
    })}
`;

const Wrapper = styled.div `
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({
        padding: "8px 0px",
    })}
`;

const Left = styled.div `
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span `
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: "none"
    })}
`;
const SearchContainer = styled.div `
    width: 55%;
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ 
        width: "100%",
        marginLeft: "8px",
        padding: "3px"
    })}

`;

const Input = styled.input `
    width: 100%;
    border: none;
    
    
`;
const Center = styled(Link) `
    text-decoration: none;
    color: black;
    flex: 1;
    text-align: center;
    ${mobile({
        marginLeft: "10px",
    })}
`;

const Logo = styled.h1 `
    font-weight: bold;
    ${mobile({
        fontSize: "14px"
    })}
`;
const Right = styled.div `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ 
        flex: 2, justifyContent: "center" 
    })}

`;

const MenuItem = styled.div `
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({
        fontSize: "10px",
        marginLeft: "4px"
    })}
`;

const Navbar = () => {

    // get user and quantity of cars from redux store 
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector((state)=> state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    // call logout reducer from user slice
    const handleLogout = () =>{
        dispatch(logout());
        history.push("/login");
    }
    
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder = "Search"/>
                        <Search style = {{color: 'Gray', fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center to ="/">
                    <Logo>Commerce App</Logo>
                </Center>
                <Right>
                    <MenuItem><Link style={{textDecoration: "none", color:"black"}} to="/register">REGISTER</Link></MenuItem>
                    <MenuItem><Link style={{textDecoration: "none", color:"black"}} to="/login">SIGN IN</Link></MenuItem>
                    {user && <MenuItem onClick = {handleLogout}>LOGOUT</MenuItem>}
                    <Link to = "/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined color="action" />
                            </Badge>
                        </MenuItem>
                    </Link>
                    
                    
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
