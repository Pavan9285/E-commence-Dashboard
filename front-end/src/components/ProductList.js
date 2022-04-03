import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    let getProductsUrl = 'http://localhost:5000/products';
    let deleteProductUrl = 'http://localhost:5000/product';

    const getProducts = async () => {
        let result = await fetch(getProductsUrl, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        // result in read stream formate so we called result.json()
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = (id) => {
        const isDelete = window.confirm(`Are you sure you want to delete Product?`);
        if (isDelete) {
            deleteProductApiCall(id)
        }
    };

    const deleteProductApiCall = async (id) => {
        let result = await fetch(`${deleteProductUrl}/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input type="text" placeholder='Search Product' className='search-product-box'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No Result Found!</h1>
            }
        </div>
    )
}

export default ProductList;