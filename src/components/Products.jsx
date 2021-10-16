import styled from "styled-components";
import Product from "./Product";
import { mobile } from '../responsive';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Container = styled.div `
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    ${mobile({
        padding: "20px 1px",
    })}
`;


const Products = ({category, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async () =>{
            try{
                const response = await axios.get(category ? `https://jesus-react-ecommerce.herokuapp.com/api/products?category=${category}` : "https://jesus-react-ecommerce.herokuapp.com/api/products");
                setProducts(response.data);
            }catch(err){
                console.log(err);
            }
        }
        
        getProducts();
    },[category])
    
    useEffect(()=>{
        if(category){
            setFilteredProducts(
                products.filter((item) => Object.entries(filters).every(([key,value])=> item[key].includes(value)))
            )
        }
    },[products,category, filters]);


    useEffect(()=>{
        if(sort === "newest"){
            setFilteredProducts((prev)=>
                [...prev].sort((first, second)=> first.createdAt - second.createdAt)
            )
        }else if(sort === "asc"){
            setFilteredProducts((prev)=>
                [...prev].sort((first, second)=> first.price - second.price)
            )
        }else{
            setFilteredProducts((prev)=>
                [...prev].sort((first, second)=> second.price - first.price)
            )
        }

    },[sort]);

    return (
        <Container>
            {category ? filteredProducts.map(item =>(
                <Product key = {item._id} item = {item}/>)) 
            : products.map(item =>(
                <Product key = {item._id} item = {item}/>))
            }
        </Container>
    )
}

export default Products;
