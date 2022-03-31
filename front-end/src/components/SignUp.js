import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "Technology@gmail.com",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    });

    useEffect(() => {
        async function submitForm() {
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
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            submitForm();
        }
    }, [formErrors, isSubmit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(registerData));
        setIsSubmit(true);
    }

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        })
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const cond1 = /^(?=.*[a-z]).{4,10}$/;
        const cond2 = /^(?=.*[A-Z]).{4,10}$/;
        const cond3 = /^(?=.*[0-9]).{4,10}$/;

        if (!values.username) {
            errors.username = "Username is required";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!"
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters"
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters"
        } else if (!cond1.test(values.password)) {
            errors.password = 'Password must contain at least one lowercase';
        } else if (!cond2.test(values.password)) {
            errors.password = 'Password must contain at least one capital letter';
        } else if (!cond3.test(values.password)) {
            errors.password = 'Password must contain at least a number';
        }
        return errors;
    }

    return (
        <div className="register">
            {/* <pre>{JSON.stringify(registerData,undefined,2)}</pre> */}
            <form onSubmit={handleSubmit}>
                <h1 style={{ color: "blue", margin: "20px" }}>Register</h1>

                <input className="inputBox" type="text" placeholder="Enter Username"
                    name="username" value={registerData.username}
                    onChange={handleChange} />
                <p style={{ color: "red" }}>{formErrors.username}</p>

                <input className="inputBox" type="text" placeholder="Enter Email"
                    name="email" value={registerData.email}
                    onChange={handleChange} />
                <p style={{ color: "red" }}>{formErrors.email}</p>

                <input className="inputBox" type="password" placeholder="Enter Password"
                    name="password" value={registerData.password}
                    onChange={handleChange} />
                <p style={{ color: "red" }}>{formErrors.password}</p>

                <button type="submit" className="appButton">SignUp</button>
            </form>
        </div>
    )
}