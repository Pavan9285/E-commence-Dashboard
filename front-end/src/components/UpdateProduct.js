import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    let productUrl = 'http://localhost:5000/product';


    const getProductDetails = async () => {
        let result = await fetch(`${productUrl}/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            setIsSubmit(false);
            return false;
        }

        // console.log(name, price, category, company);
        let result = await fetch(`${productUrl}/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        await result.json();
        setIsSubmit(true);
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    const divStyle = {
        backgroundColor: "#beddbe",
        display: "inline-block",
        fontWeight: "bold",
        padding: "10px",
        color: "green"
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            {isSubmit && <div style={divStyle}>Product updated successfully!!</div>}
            <input type="text" placeholder='Enter product name'
                className='inputBox' value={name} required
                onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid product name</span>}

            <input type="text" placeholder='Enter product price'
                className='inputBox' value={price} required
                onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span className='invalid-input'>Enter valid product price</span>}

            <input type="text" placeholder='Enter product category'
                className='inputBox' value={category} required
                onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className='invalid-input'>Enter valid product category</span>}

            <input type="text" placeholder='Enter product company'
                className='inputBox' value={company} required
                onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span className='invalid-input'>Enter valid product company</span>}

            <button className='appButton' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;