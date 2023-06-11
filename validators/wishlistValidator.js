const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const create = async (req, res, next) => {

	const schema = Joi.object({
		productID: Joi.objectId().required(),
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
	create,
}