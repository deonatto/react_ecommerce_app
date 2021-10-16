import styled from 'styled-components';
import React from 'react';

const Container = styled.div `
    height: 30px;
    width: 100%;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;

const Announcement = () => {
    return (
        <Container>
            Super deal! Free shipping on orders over 50$
        </Container>
    )
}

export default Announcement;
