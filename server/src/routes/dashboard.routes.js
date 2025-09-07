const express = require('express');
const dashboardRouter = express.Router();
const { dashboardHomepage } = require('../controllers/dashboard.controllers');

/**
 * @route GET /dashboard
 * @desc Dashboard Route
 * @access Private
 */
dashboardRouter.get('/dashboard', dashboardHomepage);

module.exports = dashboardRouter;
