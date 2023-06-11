const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const createBrandValidation = (req, res, next) => {

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

const updateBrandValidation = (req, res, next) => {

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

const getBrandByIdValidation = (req, res, next) => {

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
	createBrandValidation,
    updateBrandValidation,
    getBrandByIdValidation
}