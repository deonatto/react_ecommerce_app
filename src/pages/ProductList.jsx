import { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div `
    width: 100%;
`;
const FilterContainer = styled.div `
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div `
    margin: 20px;
    ${mobile({
        width: "0px 20px",
        display: "flex",
        flexDirection: "column"
    })}
`;

const FilterText = styled.span `
    font-size: 20px;
    font-weight: 600;
    margin-right: 2px;
`;

const Title = styled.h1 `
    margin: 20px;
    ${mobile({
        textAlign: "center"
    })}
`;
const Select = styled.select `
    padding: 8px;
    margin-right: 20px;
    ${mobile({
        margin: "5px 0px"
    })}
`;
const Option = styled.option ``;

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) =>{
        const value = e.target.value; 
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }
    
    
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <FilterContainer>
                <Filter><FilterText>Filter Products: </FilterText>
                    <Select name = "color" onChange = {handleFilters}>
                        <Option disabled>
                        Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name = "size" onChange = {handleFilters}>
                        <Option disabled>
                        Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter><FilterText>Sort Products: </FilterText>
                    <Select onChange = {e => setSort(e.target.value)}>
                        <Option value = "newest">Newest</Option>
                        <Option value = "asc">Price (asc)</Option>
                        <Option value = "desc">Price (desc)</Option>
                    </Select>
                </Filter> 
            </FilterContainer>
            <Products category = {category} filters = {filters} sort= {sort}/>
            <NewsLetter/>
            <Footer/>
        </Container>
    )
}

export default ProductList;
