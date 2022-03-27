const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const registerRoutes = require("./routes/api");

require('./db/config');

app.use(express.json());
app.use(cors());
app.use("/", registerRoutes);

app.listen(port, () => {
    console.log(`Server started on Port ${port}...`);
});