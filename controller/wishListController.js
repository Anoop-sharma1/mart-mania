const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    
    try {
        const findUser = await UserModel.findById(_id).populate("wishlist");

        if (findUser.wishlist.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Wishlist not found",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Wishlist retrieved successfully!",
            data: findUser
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const create = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productID } = req.body;

    validateMongoDbId(_id);
    validateMongoDbId(productID);

    try {

      const findProduct = await ProductModel.findById(productID);  
        if (!findProduct) { 
            return res.status(400).json({
                status: false,
                message: "Product not found!",
                data: {}
            });
        }  
        
      const user = await UserModel.findById(_id);
  
      const alreadyadded = user.wishlist.find((id) => id.toString() === productID);
        
      if (alreadyadded) {
        let user = await wishlist.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: productID },
          },
          {
            new: true,
          }
        );
  
        return res.status(200).json({
          status: true,
          message: "Product removed from the wishlist successfully!",
          data : user
        });
          
      } else {
        let user = await UserModel.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: productID },
          },
          {
            new: true,
          }
        );
        
        return res.status(200).json({
          status: true,
          message: "Product added to the wishlist successfully!",
          data : user
        });
      }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});
  
module.exports = {
    getWishlist,
    create
};
