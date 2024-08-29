const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
dotEnv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

if (!MONGO_URI.startsWith("mongodb://") && !MONGO_URI.startsWith("mongodb+srv://")) {
    console.error("Error: MONGO_URI does not start with 'mongodb://' or 'mongodb+srv://'.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1> Welcome to SUBY");
});
