import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>
            <img
                alt='logo'
                className='logo'
                src='https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-03/ecom%20%281%29.jpg'
            />
            {
                auth ?
                    <ul className='nav-ul'>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).username})</Link></li>
                    </ul>
                    : <ul className='nav-ul nav-right'>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    )
}
