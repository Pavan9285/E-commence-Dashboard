import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            setIsSubmit(false);
            return false;
        }

        // console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        setIsSubmit(true);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
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
            <h1>Add Product</h1>
            {isSubmit && <div style={divStyle}>Product added successfully!!</div>}
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

            <button className='appButton' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;