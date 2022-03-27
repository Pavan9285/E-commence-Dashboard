import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name'
                className='inputBox' value={name} required
                onChange={(e) => { setName(e.target.value) }} />
            <input type="text" placeholder='Enter product price'
                className='inputBox' value={price} required
                onChange={(e) => { setPrice(e.target.value) }} />
            <input type="text" placeholder='Enter product category'
                className='inputBox' value={category} required
                onChange={(e) => { setCategory(e.target.value) }} />
            <input type="text" placeholder='Enter product company'
                className='inputBox' value={company} required
                onChange={(e) => { setCompany(e.target.value) }} />
            <button className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;