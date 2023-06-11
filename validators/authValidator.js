const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const login = async (req, res, next) => {

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

const register = async (req, res, next) => {

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

const forgorPassword = async (req, res, next) => {

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

const resetPassword = async (req, res, next) => {

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

async function errorResponse(res, error) {
	return res.status(406).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
    login,
    register,
    forgorPassword,
    resetPassword
}