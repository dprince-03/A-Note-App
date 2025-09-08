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
		Notes.aggregate([
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$match: {
					user: mongoose.Types.ObjectId(req.body.id),
				},
			},
			{
				$project: {
					title: {
						$substr: ["$title", 0, 30],
					},
					body: {
						$substr: ["$body", 0, 100],
					},
				},
			},
		])
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec((err, notes) => {
			Notes.count().exec((err, count) => {
				if(err) return next(err);
				
				res.render("dashboard/index", {
					userName: req.user.firstName,
					locals,
					notes,
					layout: "../views/layouts/dashboard",
					current: page,
					pages: Math.ceil( count / perPage),
				});
			});
		});

		// const notes = await Notes.find({});
		
		
	} catch (error) {
		console.log(error);
		
	}

};

module.exports = { 
    dashboardHomepage,
};