import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginData, setLoginData] = useState({
        username: "",
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

        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        result = await result.json();
        if (result.username) {
            localStorage.setItem("user", JSON.stringify(result));
            // reset the form
            setLoginData({
                username: "",
                password: "",
            });
            navigate("/");
        } else {
            alert("Please enter correct credentials!!")
        }
    }

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        })
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1 style={{ color: "blue", margin: "20px" }}>Login</h1>

                <input className="inputBox" type="text" placeholder="Enter Username"
                    name="username" value={loginData.username}
                    onChange={handleChange} required />

                <input className="inputBox" type="password" placeholder="Enter Password"
                    name="password" value={loginData.password}
                    onChange={handleChange} required />

                <button type="submit" className="appButton">Login</button>
            </form>
        </div>
    )
}

export default Login;