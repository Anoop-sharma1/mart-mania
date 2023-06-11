const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");
const CouponModel = require("../models/couponModel");
const OrderModel = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const userCart = asyncHandler(async (req, res) => {

    const { cart } = req.body;
    const { _id } = req.user;

    validateMongoDbId(_id);

    try {
        let products = [];
        const user = await UserModel.findById(_id);

        // check if user already have product in cart
        const alreadyExistCart = await CartModel.findOne({ orderby: user._id });

        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }

        for (let i = 0; i < cart.length; i++) {

            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;

            let getPrice = await ProductModel.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }

        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }

        let newCart = await new CartModel({
            products,
            cartTotal,
            orderby: user?._id,
        }).save();

        return res.status(200).json({
            status: true,
            message: "Cart Added Successfully!",
            data: newCart,
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const cart = await CartModel.findOne({ orderby: _id }).populate(
            "products.product"
        );

        if (!cart) {
            return res.status(400).json({
                status: false,
                message: "Cart Not Found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Cart retrived successfully!",
            data: cart
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const user = await UserModel.findOne({ _id });
        const cart = await CartModel.findOneAndRemove({ orderby: user._id });

        if (!cart) {
            return res.status(400).json({
                status: false,
                message: "Cart Not Found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Cart Emptied Successfully!",
            data: cart
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const applyCoupon = asyncHandler(async (req, res) => {

    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const validCoupon = await CouponModel.findOne({ name: coupon });

        if (validCoupon === null) {
            return res.status(400).json({
                status: false,
                message: "Invalid Coupon!",
                data: {}
            });
        }

        const user = await UserModel.findOne({ _id });

        let { cartTotal } = await CartModel.findOne({
            orderby: user._id,
        }).populate("products.product");

        let totalAfterDiscount = (
            cartTotal -
            (cartTotal * validCoupon.discount) / 100
        ).toFixed(2);

        await CartModel.findOneAndUpdate(
            { orderby: user._id },
            { totalAfterDiscount },
            { new: true }
        );

        return res.status(200).json({
            status: true,
            message: "Coupon Applied Successfully!",
            data: totalAfterDiscount
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;

    validateMongoDbId(_id);

    try {
        if (!COD) {
            return res.status(400).json({
                status: false,
                message: "Create cash order failed!",
                data: {}
            });
        };

        const user = await UserModel.findById(_id);
        let userCart = await CartModel.findOne({ orderby: user._id });

        let finalAmout = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        }

        let newOrder = await new OrderModel({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmout,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "usd",
            },
            orderby: user._id,
            orderStatus: "Cash on Delivery",
        }).save();

        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                },
            };
        });

        const updated = await ProductModel.bulkWrite(update, {});

        return res.status(200).json({
            status: true,
            message: "Order Created Successfully!",
            data: newOrder
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});


module.exports = {
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder
};
