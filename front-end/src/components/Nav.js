import React, { useEffect } from 'react';
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
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link> </li>
                <li><Link to="/add">Add Product</Link> </li>
                <li><Link to="/update">Update Product</Link> </li>
                <li><Link to="/profile">Profile</Link> </li>

                {
                    auth ? <li><Link to="/signup" onClick={logout}>Logout</Link></li>
                        : <>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                }
            </ul>
        </div>
    )
}
