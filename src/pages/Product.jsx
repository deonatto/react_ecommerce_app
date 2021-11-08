import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios';
import { addProduct } from "../redux/cartRedux";
import {useDispatch, useSelector} from 'react-redux';

const Container = styled.div `
    width: 100%;
`;
const Wrapper = styled.div `
    height: 90vh;
    width: 100%;
    padding: 50px;
    display: flex;
    background-color: #f1ececd4;
    ${mobile({
        height: "100vh",
        flexDirection: "column",
        padding: "5px"
    })}
    
`;
const ImgContainer = styled.div `
    flex: 1;
    ${mobile({
        height: "40%"
    })}
`;
const Image = styled.img `
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InfoContainer = styled.div `
    flex: 1;
    height: 100%;
    padding: 0px 50px;
    ${mobile({
        height: "60%",
        padding: "0px 10px"
    })}
`;

const Title = styled.h1 `
    font-weight: 200;
    ${mobile({
        fontSize: "24px",
    })}
`;

const Desc = styled.p `
    margin: 20px 0px;
    ${mobile({
        margin: "4px 0px",
        fontSize: "14px"
    })}
`;
const Price = styled.span `
    font-size: 40px;
    font-weight: 100;
    ${mobile({
        fontSize: "20px"
    })}
`;

const FilterContainer = styled.div `
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
    ${mobile({
        margin: "10px 0px",
    })}
`;
const Filter = styled.div `
    display: flex;
    align-items: center;
    ${mobile({
        margin: "0px 2px",
    })}
`;

const FilterTitle = styled.span `
    font-size: 20px;
    font-weight: 200;
    ${mobile({
        fontSize: "18px"
    })}
`;
const FilterColor = styled.div `
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
    margin: 0px 5px;
    cursor: pointer;
    &:hover{
        height: 22px;
        width: 22px; 
    }
    &:active{
        border: 2px solid teal;
    }
    ${mobile({
        width: "15px",
        height: "15px",
        margin: "0px 2px",
    })}
`;
const FilterSize = styled.select `
    margin-left: 10px;
    padding: 5px;
    ${mobile({
        padding: "3px"
    })}
`;

const FilterSizeOption = styled.option `
`;

const AddContainer = styled.div `
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AmountContainer = styled.div `
    display: flex;
    align-items: center;
    font-weight: 700;
    ${mobile({
        fontWeight: "400"
    })}
`;

const Amount = styled.span `
    width: 25px;
    height: 25px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    ${mobile({
        fontWeight: "400"
    })}
`;

const Button = styled.button `
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }

    ${mobile({
        padding: "3px 15px",
        fontSize: "12px"
    })}
`;

const Product = () => {
    const location = useLocation();
    // product id
    const id = location.pathname.split("/")[2];
    const user = useSelector((state)=> state.user.currentUser);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    // get product
    useEffect(()=>{
        try{
            const getProduct = async () =>{
                const response = await axios.get("https://jesus-react-ecommerce.herokuapp.com/api/products/find/" + id);
                setProduct(response.data);
            }
            getProduct();
        }catch(err){
            console.log(err);
        }
    },[id]);

    //add product to cart if user is logged in
    const handleClick =()=> {
        try{
            if(user){
                dispatch(addProduct({...product, quantity: quantity, color:color, size:size}));
            }
        }catch(err){
            console.log(err);
        }
        

    }
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                <ImgContainer>
                    <Image src= {product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color && product.color.map((color) =>(
                                <FilterColor key = {color} color = {color} onClick = {()=> setColor(color)}/>
                            ))}
                            
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange = {(e)=> setSize(e.target.value)}>
                                {product.size && product.size.map((size) =>(
                                    <FilterSizeOption key = {size}>{size}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick = {()=> quantity === 1 ? setQuantity(quantity) : setQuantity(quantity - 1)} style = {{cursor: "pointer"}}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick = {()=>setQuantity(quantity + 1)} style = {{cursor: "pointer"}}/>
                        </AmountContainer>
                        <Button onClick = {handleClick}>ADD TO CAR</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter/>
            <Footer/>
        </Container>
    )
}

export default Product;
