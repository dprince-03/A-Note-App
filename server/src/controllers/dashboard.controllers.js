const mongoose = require("mongoose");
const Notes = require("../models/notes.models");

/**
 * 
 */
const dashboardHomepage = async (req, res) => {
	let perPage = 12;
	let page = req.query.page || 1;
	
	const locals = {
		title: "Node js Notes App",
		description: "Node js Notes App",
	};

	try {
		// Check if user exists
		if (!req.user) {
			return res.redirect("/");
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

module.exports = { 
    dashboardHomepage,
};