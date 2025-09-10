const express = require('express');
const dashboardRouter = express.Router();

const { 
    dashboardHomepage, 
    dashboardViewNote, 
    dashboardUpdateNote,
    dashboardDeleteNote,
    dashboardAddNote,
    dashboardAddNoteSubmit,
    dashboardSearch,
    dashboardSearchSubmit, 
} = require('../controllers/dashboard.controllers');
const { isLoggedIn } = require('../middleware/auth.middleware');

/**
 * @route GET /dashboard
 * @desc Dashboard Routes
 * @access Private
 */
dashboardRouter.get('/dashboard', isLoggedIn, dashboardHomepage);
dashboardRouter.get('/dashboard/add', isLoggedIn, dashboardAddNote); // Create
dashboardRouter.post("/dashboard/add", isLoggedIn, dashboardAddNoteSubmit);
dashboardRouter.get("/dashboard/item/:id", isLoggedIn, dashboardViewNote); // Read
dashboardRouter.put("/dashboard/item/:id", isLoggedIn, dashboardUpdateNote); // Update
dashboardRouter.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardDeleteNote); // Delete
dashboardRouter.get("/dashboard/search", isLoggedIn, dashboardSearch);
dashboardRouter.post("/dashboard/search", isLoggedIn, dashboardSearchSubmit);

module.exports = dashboardRouter;
