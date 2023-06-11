const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const createColorValidation = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().regex(/^#[A-Fa-f0-9]{6}/
        ).message("Color must be a hex code").required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, error)
    } else {
        next();
    }
}

const updateColorValidation = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, error)
    } else {
        next();
    }
}

const getColorByIdValidation = (req, res, next) => {

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
	createColorValidation,
	updateColorValidation,
	getColorByIdValidation
};