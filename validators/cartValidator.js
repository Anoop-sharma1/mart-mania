const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const addCart = async (req, res, next) => {

	const schema = Joi.object({
        cart : Joi.array().required(),
    })
    
	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const applyCoupon = async (req, res, next) => {

	const schema = Joi.object({
		coupon: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return errorResponse(res, error)
	} else {
		next();
	}
};

const order = async (req, res, next) => {

	const schema = Joi.object({
        COD: Joi.boolean().required(),
        couponApplied: Joi.boolean().required()
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
    addCart,
    applyCoupon,
    order
}