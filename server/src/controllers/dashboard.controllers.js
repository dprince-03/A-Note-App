

const dashboardHomepage = async (req, res) => {
	const locals = {
		title: "Node js Notes App",
		description: "Node js Notes App",
	};

	res.render('dashboard/index', {
		locals,
		layout: '../views/layouts/dashboard',
	});
};

module.exports = { 
    dashboardHomepage,
};