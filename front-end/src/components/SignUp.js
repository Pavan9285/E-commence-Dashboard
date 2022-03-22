import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "Technology@gmail.com",
        password: "",
    });

    
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(registerData)
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result));

        // reset the form
        setRegisterData({
            username: "",
            email: "Technology@gmail.com",
            password: "",
        });
        navigate("/");
    }

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        })
    }

    return (
        <div className="register">
            {/* <pre>{JSON.stringify(registerData,undefined,2)}</pre> */}
            <form onSubmit={handleSubmit}>
                <h1 style={{ color: "blue", margin: "20px" }}>Register</h1>
                <input className="inputBox" type="text" placeholder="Enter Name"
                    name="username" value={registerData.username}
                    onChange={handleChange} />
                <input className="inputBox" type="text" placeholder="Enter Email"
                    name="email" value={registerData.email}
                    onChange={handleChange} />
                <input className="inputBox" type="password" placeholder="Enter Password"
                    name="password" value={registerData.password}
                    onChange={handleChange} />
                <button type="submit" className="appButton">SignUp</button>
            </form>
        </div>
    )
}