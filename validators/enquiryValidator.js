const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const create = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
		mobile: Joi.number().required(),
		comment: Joi.string().required(),
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
    create,
};