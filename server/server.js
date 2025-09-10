require("dotenv").config({
	path: require("path").resolve(__dirname, "../../../.env"),
});

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

const connectDB = require('./src/config/db.config');
const pageRouter = require("./src/routes/appPages.routes");
const dashboardRouter = require("./src/routes/dashboard.routes");
const authRouter = require("./src/routes/auth.routes");


// // Debug: Check if MONGODB_URL is loaded
// console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Found' : 'Not found');
// console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'Found' : 'Not found');

// // Only proceed if we have the required environment variables
// if (!process.env.MONGODB_URL) {
//     console.error('MONGODB_URL environment variable is required');
//     process.exit(1);
// }

// if (!process.env.SESSION_SECRET) {
//     console.error('SESSION_SECRET environment variable is required');
//     process.exit(1);
// }

connectDB();

const app = express();
const PORT = process.env.PORT || 8050;

// Sessions
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ 
		mongoUrl: process.env.MONGODB_URL 
	}),
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24,
		secure: false, // Set to true if using HTTPS
        httpOnly: true
	}, // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(methodOverride());
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
app.use('/', authRouter);
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