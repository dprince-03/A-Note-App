const express = require('express');
const pageRouter = express.Router();

const { homepage } = require('../controllers/appPages.controllers');

pageRouter.get("/", homepage);

module.exports = pageRouter;