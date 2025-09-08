const express = require('express');
const dashboardRouter = express.Router();

const { dashboardHomepage } = require('../controllers/dashboard.controllers');
const { isLoggedIn } = require('../middleware/auth.middleware');

/**
 * @route GET /dashboard
 * @desc Dashboard Route
 * @access Private
 */
dashboardRouter.get('/', isLoggedIn, dashboardHomepage);

module.exports = dashboardRouter;
