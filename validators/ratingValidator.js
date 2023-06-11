const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const rating = async (req, res, next) => {

    const schema = Joi.object({
		prodId: Joi.objectId().required(),
        star: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
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
	rating,
}