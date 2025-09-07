const express = require('express');
const pageRouter = express.Router();

const { 
    homepage, 
    about,
} = require('../controllers/appPages.controllers');

pageRouter.get("/", homepage);
pageRouter.get("/about", about);

module.exports = pageRouter;