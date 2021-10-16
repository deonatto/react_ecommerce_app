import { Facebook, Instagram, MailOutlined, Phone, Room, Twitter } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div `
    display: flex;
    ${mobile({
        flexDirection: "column"
    })}
`;

const Left = styled.div `
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({
        padding: "10px"
    })}
`;

const Logo = styled.h1 `
`

const Desc = styled.p `
    margin: 20px 0px;
    ${mobile({
        margin: "5px 0px",
        fontSize: "15px"
    })}
`;

const SocialContainer = styled.div `
    display: flex;
`;

const SocialIcon = styled.div `
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    background-color: #${props=> props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`;

const Center = styled.div `
    flex: 1;
    padding: 20px;
    ${mobile({
        display: "none",
    })}
`;

const Title = styled.h3 `
    margin-bottom: 30px;
`;

const List = styled.ul `
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex; 
    flex-wrap: wrap;
`;
const ListItem = styled.li `
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div `
    flex: 1;
    padding: 20px;
    ${mobile({
        padding: "10px",
        backgroundColor: "#fff8f8"
    })}
`;

const ContactItem = styled.div `
    margin-bottom: 20px;
    display: flex;
    align-items: center;

`;
const Payment = styled.img `
    width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>CommerceApp</Logo>
                <Desc>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don’t look even slightly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color = "3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color = "E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color = "55ACEE">
                        <Twitter/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight:"10px"}}/> 622 dixie patch, south tobinchester
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"10px"}}/> +12345678
                </ContactItem>
                <ContactItem>
                    <MailOutlined style={{marginRight:"10px"}}/> contact@commerce.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> 
            </Right>
        </Container>
    )
}

export default Footer;
