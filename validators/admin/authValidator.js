const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const loginValidation = async (req, res, next) => {

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

const forgotPasswordValidation = async (req, res, next) => {

	const schema = Joi.object({
		email: Joi.string().email().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

async function errorResponse(res, error) {
	return res.status(400).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

const resetPasswordValidation = async (req, res, next) => {

	const schema = Joi.object({
		password: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

async function errorResponse(res, error) {
	return res.status(400).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
	loginValidation,
	forgotPasswordValidation,
	resetPasswordValidation
}