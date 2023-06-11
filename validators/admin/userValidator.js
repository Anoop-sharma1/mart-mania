const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const getUserByIdValidation = (req, res, next) => {

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

const profile = (req, res, next) => {

	const schema = Joi.object({
		image: Joi.required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
}

const update = (req, res, next) => {

	const schema = Joi.object({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		mobile: Joi.number().required(),
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
		data: {}
	});
}

module.exports = {
	getUserByIdValidation,
	profile,
	update
}