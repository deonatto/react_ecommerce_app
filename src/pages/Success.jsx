import React from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Success = () => {
    const location = useLocation()
    const data = location.state.data;
    console.log(data);
    return (
        <div style={{height:"100vh",display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
            Successfull. Your order is being prepared...
            <Link to="/" style={{padding:10, marginTop:20}}>Go to Homepage</Link>
        </div>
    )
}

export default Success;
