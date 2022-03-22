const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
})

// const connectDB = async () => {
//     mongoose.connect('mongodb://localhost:27017/e-commerce');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('product', productSchema);
//     const data = await product.find();
//     console.log("data:", data);
// }
// connectDB();

app.get("/", (req, res) => {
    res.send("App is working!")
})

app.listen(5000)