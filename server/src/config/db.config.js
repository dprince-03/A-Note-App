require("dotenv").config({
	path: require("path").resolve(__dirname, "../../../.env"),
});

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const DB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
    
    if (!DB_URL) {
        throw new Error(
            "MongoDB connection string is not defined in environment variables."
        );
    }

	try {
		const connect = await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(
			`Database connected: ${connect.connection.host}\n`,
			`Database name: ${connect.connection.name}`
		);

		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

module.exports = connectDB;
