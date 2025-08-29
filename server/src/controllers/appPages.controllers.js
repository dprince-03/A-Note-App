

const homepage = async (req, res) => {
    const locals = {
		title: "Node js Notes App",
		description: "Node js Notes App",
	};

	res.render("index", locals);
};

module.exports = { 
    homepage,
};