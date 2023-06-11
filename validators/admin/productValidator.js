const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const createProductValidation = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        price: Joi.number().min(1).required(),
        category: Joi.string().required(),
        brand: Joi.string().required(),
        quantity: Joi.number().min(0).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, error)
    } else {
        next();
    }
}

const updateProductValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        expiry: Joi.date().required(),
        discount: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, error)
    } else {
        next();
    }
}

const getProductByIdValidation = (req, res, next) => {
    
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
	return res.status(406).json({
		status: false,
		message: `${error.message.replace(/\"/g, '')}!`,
		data:{}
	});
}

module.exports = {
	createProductValidation,
	updateProductValidation,
	getProductByIdValidation
};