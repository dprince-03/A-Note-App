const express = require('express');
const pageRouter = express.Router();

const { 
    homepage, 
    about,
} = require('../controllers/appPages.controllers');
/**
 * @route GET /
 * @desc Homepage Route
 * @access Public
 */
pageRouter.get("/", homepage);

/**
 * @route GET /about
 * @desc About Page Route
 * @access Public
 */
pageRouter.get("/about", about);

module.exports = pageRouter;