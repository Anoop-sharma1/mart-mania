const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const updateEnquiryValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
		mobile: Joi.number().required(),
		status : Joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, error)
    } else {
        next();
    }
}

const getEnquiryValidation = (req, res, next) => {

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

const deleteEnquiryValidation = (req, res, next) => {

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
    updateEnquiryValidation,
    getEnquiryValidation,
    deleteEnquiryValidation,
};