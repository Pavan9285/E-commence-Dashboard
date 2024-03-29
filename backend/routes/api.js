const express = require('express');
const router = express.Router()
const User = require("../db/User");
const Product = require("../db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

router.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    JwtSign(res, result)
})

router.post("/login", async (req, res) => {
    if (req.body.username && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        user ? JwtSign(res, user) : res.send({ result: 'No user found' })
    } else {
        res.send({ result: 'No user found' })
    }
})

const JwtSign = (res, user) => {
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        err ? res.send({ result: "something went wrong, Please try after some time!" })
            : res.send({ user, auth: token });
    })
}

router.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

router.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Products found" })
    }
})

router.get("/product/:id", verifyToken, async (req, res) => {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.send({ result: "No Product found" })
    }
})

router.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

router.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
});

// search api
router.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    });
    res.send(result);
});

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            err ? res.status(401).send({ result: "Please provide valid token" }) : next();
        })
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }
}

module.exports = router;