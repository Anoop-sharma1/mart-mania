const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const createBlogValidation = (req, res, next) => {

	const schema = Joi.object({
		title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.objectId().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const updateBlogValidation = (req, res, next) => {

	const schema = Joi.object({
		title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.objectId().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const getBlogValidation = (req, res, next) => {

	const schema = Joi.object({
        id: Joi.objectId().required(),
	});

	const { error } = schema.validate(req.params);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const deleteBlogValidation = (req, res, next) => {

	const schema = Joi.object({
        id: Joi.objectId().required(),
	});

	const { error } = schema.validate(req.params);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const uploadBlogValidation = (req, res, next) => {

	const schema = Joi.object({
        id: Joi.objectId().required(),
	});

	const { error } = schema.validate(req.params);

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
    createBlogValidation,
    updateBlogValidation,
    getBlogValidation,
    deleteBlogValidation,
    uploadBlogValidation,
};