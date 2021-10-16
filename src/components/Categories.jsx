import styled from "styled-components";
import {categories} from '../data';
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div `
    display: flex;
    padding: 20px;
    justify-content: space-between;
    height: 70vh;
    width: 100%;
    ${mobile({
        height: "100vh",
        padding: "0px",
        flexDirection: "column"
    })}
`;

const Categories = () => {
    return (
        <Container>
            {categories.map(item =>(
                <CategoryItem key = {item.id} item = {item}/>
            ))}
        </Container>
    )
}

export default Categories;
