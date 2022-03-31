const express = require('express');
const router = express.Router()
const User = require("../db/User");
const Product = require("../db/Product");

router.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

router.post("/login", async (req, res) => {
    if (req.body.username && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        user ? res.send(user) : res.send({ result: 'No user found' })
    } else {
        res.send({ result: 'No user found' })
    }
})

router.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

router.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Products found" })
    }
})

router.get("/product/:id", async (req, res) => {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.send({ result: "No Product found" })
    }
})

router.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

router.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
});

module.exports = router;