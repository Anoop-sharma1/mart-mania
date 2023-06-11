const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const saveAddress = async (req, res, next) => {

	const schema = Joi.object({
		address: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const updatePassword = async (req, res, next) => {

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

const update = async (req, res, next) => {

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
};

async function errorResponse(res, error) {
	return res.status(406).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
    saveAddress,
    updatePassword,
    update
}