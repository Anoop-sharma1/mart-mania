const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const userLogInValidation = async (req, res, next) => {

	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const userRegisterValidation = async (req, res, next) => {

	const schema = Joi.object({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		mobile: Joi.number().required(),
		password: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const addWishlistValidation = async (req, res, next) => {

	const schema = Joi.object({
		productID: Joi.objectId(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const adminLoginValidation = async (req, res, next) => {

	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const creteBlogCategoryValidation = (req, res, next) => {

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
	return res.status(406).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
	userLogInValidation,
	userRegisterValidation,
	addWishlistValidation,
	adminLoginValidation,
	creteBlogCategoryValidation
}