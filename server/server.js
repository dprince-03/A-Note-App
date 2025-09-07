require("dotenv").config({
	path: require("path").resolve(__dirname, "../../../.env"),
});

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./src/config/db.config');
const pageRouter = require("./src/routes/appPages.routes");
const dashboardRouter = require("./src/routes/dashboard.routes");

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

// static files
app.use(express.static('public'));

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', pageRouter);
app.use('/', dashboardRouter);

//Handle 404
app.use((req, res) => {
	const locals = {
		title: "Page Not Found",
		description: "The requested page could not be found.",
	};
	res.status(404).render("404", { locals });
});

app.listen(PORT, () =>{
    console.log(`Server is running on: http://localhost:${PORT}`);
});