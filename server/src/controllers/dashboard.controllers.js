const mongoose = require("mongoose");
const Notes = require("../models/notes.models");

/**
 * @route GET /dashboard
 * @desc Dashboard Page Route
 * @access Private
*/
const dashboardHomepage = async(req, res) => {
	let perPage = 12;
	let page = req.query.page || 1;
	
	const locals = {
		title: "Node js Notes App",
		description: "Node js Notes App",
	};

	try {
		// Check if user exists
		if (!req.user) {
			return res.redirect("/dashboard");
		}

		const notes = await Notes.aggregate([
			{
				$sort: { createdAt: -1 },
			},
			{
				$match: { user: new mongoose.Types.ObjectId(req.user._id) },
			},
			{
				$project: {
					title: { $substr: ["$title", 0, 30] },
					body: { $substr: ["$body", 0, 100] },
				},
			},
		])
			.skip(perPage * page - perPage)
			.limit(perPage);
		// .exec(function (err, notes){
		// 	Notes.count().exec(function (err, count){
		// 		if (err) return next(err);
		// 		res.render("dashboard/index", {
		// 			userName: req.user.firstName,
		// 			locals,
		// 			notes,
		// 			layout: "../views/layouts/dashboard",
		// 			current: page,
		// 			pages: Math.ceil(count / perPage),
		// 		});
		// 	});})
		// const notes = await Notes.find({});

		// Get total count
		const count = await Notes.countDocuments({ user: req.user._id });

		res.render("dashboard/index", {
			userName: req.user.firstName,
			locals,
			notes,
			layout: "../views/layouts/dashboard",
			current: page,
			pages: Math.ceil(count / perPage),
		});

	} catch (error) {
		console.log(error);
		
	}

};

/**
 * @route GET /dashboard/add
 * @desc Dashboard Add Note Page Route
 * @access Private
*/
const dashboardAddNote = async(req, res) => {
	try {
		res.render("dashboard/add", {
			layout: "../views/layouts/dashboard",
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * @route POST /dashboard/add
 * @desc Dashboard Add Note Page Route
 * @access Private
*/
const dashboardAddNoteSubmit = async(req, res) => {
	try {
		req.body.user = req.user.id;
		await Notes.create(req.body);

		res.redirect("/dashboard");
	} catch (error) {
		console.log(error);
	}
};

/**
 * @route GET /dashboard/items/:id
 * @desc Dashboard View Specific Note Route
 * @access Private
*/
const dashboardViewNote = async(req, res) => {
	const note = await Notes.findById({ 
		_id: req.params.id,
	}).where({
		user: req.user.id,
	}).lean();

	if (note) {
		res.render("dashboard/view-note", {
			noteID: req.params.id,
			note,
			layout: "../views/layouts/dashboard",
		});
	} else {
		res.send('Somethin went wrong.');
	}
};

/**
 * @route PUT /dashboard/items/:id
 * @desc Dashboard Update Specific Note Route
 * @access Private
*/
const dashboardUpdateNote = async(req, res) => {
	try {
		await Notes.findByIdAndUpdate(
		{ _id : req.params.id }, 
		{ 
			title : req.body.title,
			body: req.body.body,
		}).where({
			user: req.user.id,
		});

		res.redirect("/dashboard");

	} catch (error) {
		console.log(error);
	}
};

/**
 * @route DELETE /dashboard/items/:id
 * @desc Dashboard Delete Specific Note Route
 * @access Private
*/
const dashboardDeleteNote = async(req, res) => {
	try {
		await Notes.findOneAndDelete({
			_id: req.params.id,
		}).where({
			user: req.user.id,
		});

		res.redirect("/dashboard");

	} catch (error) {
		console.log(error);
	}
};


const dashboardSearch = async(req, res) => {
	try {
		res.render('dashboard/search', {
			searchResult: '',
			layout: '../views/layouts/dashboard',
		});
	} catch (error) {
		console.log(error);
	}
};

const dashboardSearchSubmit = async(req, res) => {
	try {
		let searchTerm = req.body.searchTerm;
		const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

		const searchResults = await Notes.find({
			$or: [
				{ title: { $regex: new RegExp(searchNoSpecialCharacters, "i") } },
				{ body: { $regex: new RegExp(searchNoSpecialCharacters, "i") } },
			],
		}).where( { user: req.user.id } );

		res.render("dashboard/search", {
			searchResults,
			layout: "../views/layouts/dashboard",
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = { 
    dashboardHomepage,
	dashboardAddNote,
	dashboardAddNoteSubmit,
	dashboardViewNote,
	dashboardUpdateNote,
	dashboardDeleteNote,
	dashboardSearch,
	dashboardSearchSubmit,
};