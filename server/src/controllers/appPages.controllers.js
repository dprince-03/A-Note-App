

const homepage = async (req, res) => {
    const locals = {
		title: "Node js Notes App",
		description: "Node js Notes App",
	};

	res.render("index", locals);
};

const about = async (req, res) => {
	const locals = {
		title: "Node js Notes App - about page",
		description: "Node js Notes App",
	};

	res.render("about", locals);
};

module.exports = { 
    homepage,
	about,
};