import styled from "styled-components";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import {removeProducts} from '../redux/cartRedux'
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div `
    width: 100%;
    
`;

const Wrapper = styled.div `
    width: 100%;
`;

const Title = styled.h1 `
    font-weight: 300;
    text-align: center;
    ${mobile({
        fontSize: "25px"
    })}
`;

const Top = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    ${mobile({
        padding: "5px"
    })}
`;

const TopButton = styled.button `
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "teal" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};

    ${mobile({
        padding: "5px",
        fontSize: "11px"
    })}
`;




const Bottom = styled.div `
    display: flex;
    justify-content: space-between;
    ${mobile({
        flexDirection: "column"
    })}
`;

const Info = styled.div `
    flex: 3;
    margin-left: 14px;
`;

const Product = styled.div `
    display: flex;
    height: 40vh;
    justify-content: space-between;
    ${mobile({
        flexDirection: "column",
        height: "30vh",
    })}
`;

const ProductDetails = styled.div `
    flex: 2;
    display: flex;
    flex-wrap: wrap;
`;

const Image = styled.img `
    width: 200px;
    ${mobile({
        width: "100px"
    })}
`;

const Details = styled.div `
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${mobile({
        padding: "5px"
    })}
`;

const ProductName = styled.span `
    ${mobile({
        fontSize: "13px"
    })}
`;

const ProductId = styled.span `
    ${mobile({
        fontSize: "12px"
    })}
`;

const ProductColor = styled.div `
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
    ${mobile({
        width: "10px",
        height: "10px"
    })}
`;

const ProductSize = styled.span `
    ${mobile({
        fontSize: "12px"
    })}
`;

const PriceDetails = styled.div `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({
        flexDirection:"row",
        alignItems: "center",
        
    })}
`;

const ProductAmountContainer = styled.div `
    display: flex; 
    align-items: center;
    margin-bottom: 20px;
    ${mobile({
        marginBottom: "4px",
        fontSize: "14px"
    })}
`;

const ProductAmount = styled.div `
    font-size: 24px;
    margin: 5px;
    ${mobile({
        fontSize: "14px"

    })}
`;

const ProductPrice = styled.div `
    font-weight: 200;
    font-size: 25px;
    ${mobile({
        fontSize: "14px",
        marginBottom: "4px"
    })}
`;


const Summary = styled.div `
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 55vh;
    ${mobile({
        flexDirection: "column",
        height: "30vh",
        padding: "2px"
    })}
`;

const SummaryTitle = styled.h1 `
    font-weight: 200;
    padding: 10px 0px;
    ${mobile({
        padding: "5px 0px",
        fontSize: "25px",
        textAlign: "center"
    })}
`;

const SummaryItem = styled.div `
    margin: 25px 0px;
    font-size: ${props=>props.type === "total" ? "22px" : "17px"};
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};

    ${mobile({
        margin: "10px 0px"
    })}
`;

const SummaryItemText = styled.span `
    ${mobile({
        fontSize: "15px"
    })}
`;

const Button = styled.button `
    width: 100%;
    padding: 10px;
    background-color: teal;
    font-weight: 600;
    color: white;
    cursor: pointer;
    ${mobile({
        padding: "8px"
    })}
`;

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const user = useSelector((state)=> state.user.currentUser);
    const [stripeToken, setStripeToken] = useState(null);
    let history = useHistory();
    const dispatch = useDispatch();

    const onToken = (token)=>{
        setStripeToken(token);
    }

    useEffect(()=>{
        const stripeRequest = async() =>{
            try{
                const response = await axios.post("http://localhost:5000/api/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                history.push("/success", {data: response.data});
            }catch(err){
                console.log(err);
            }
        }
        stripeToken && stripeRequest();
    },[stripeToken]);

    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>     
                    {user && <TopButton onClick = {()=> dispatch(removeProducts())}>EMPTY CART</TopButton>}  
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => (
                            <Product>
                                <ProductDetails>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductId><b>ID:</b> {product._id}</ProductId>
                                        <ProductColor color={product.color}/>
                                        <ProductSize> <b>Size:</b> {product.size}</ProductSize>
                                    </Details>
                                </ProductDetails>
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <ProductAmount>Quantity:{product.quantity}</ProductAmount>
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetails>
                            </Product>
                            
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemText>${cart.total}</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemText>$ 5.90</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemText>$ -5.90</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem type = "total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemText>${cart.total}</SummaryItemText>
                        </SummaryItem>
                        {
                            user && (
                                <StripeCheckout
                                    name = "Commerce App"
                                    billingAddress
                                    shippingAddress
                                    description = {`Your total is $${cart.total}`}
                                    amount = {cart.total *100}
                                    token = {onToken}
                                    stripeKey = {KEY}
                                >
                                    <Button>CHECKOUT NOW</Button>
                                </StripeCheckout>
                            )
                        }
                        
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart;
