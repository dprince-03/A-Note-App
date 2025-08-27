const mongoose = require('mongoose');

const MONGODB_URL = require("dotenv").config().parsed.MONGODB_URL;

mongoose.set('strictQuery', true);

const DB_URL = process,env.MONGODB_URL || MONGODB_URL;

if (!DB_URL) {
    throw new Error("MongoDB connection string is not defined in environment variables.");
};

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(
            `Database connected: ${connect.connection.host}\n`,
            `Database name: ${connect.connection.name}`,
        );

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

console.log(`Done setting up database connection configuration.\nDB_URL: ${DB_URL}`);

module.exports = connectDB;