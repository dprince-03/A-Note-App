require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./src/config/db.config');

connectDB();

const app = express();
const PORT = process.env.PORT || 8050;

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
}));
app.use(morgan('combined'));


app.listen(PORT, () =>{
    console.log(`Server is running on: http://localhost:${PORT}`);
});