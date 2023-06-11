const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const createBlogCategoryValidation = (req, res, next) => {

	const schema = Joi.object({
		title: Joi.string().required()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const updateBlogCategoryValidation = (req, res, next) => {

	const schema = Joi.object({
		title: Joi.string().required()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

async function errorResponse(res, error) {
	return res.status(400).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
	createBlogCategoryValidation,
	updateBlogCategoryValidation
}