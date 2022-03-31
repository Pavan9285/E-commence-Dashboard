import React, { useEffect, useState } from 'react';

let getRoute = 'http://localhost:5000/products';
let deleteRoute = 'http://localhost:5000/product';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch(getRoute);
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
        let result = await fetch(`${deleteRoute}/${id}`, {
            method: "delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button></li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList;