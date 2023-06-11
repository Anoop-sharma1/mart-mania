const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const updateOrderValidation = (req, res, next) => {

    const schema = Joi.object({
        status: Joi
            .string()
            .valid(
                "Not Processed",
                "Cash on Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered"
            )
            .required(),
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
        data: {}
    });
}

module.exports = {
    updateOrderValidation,
};