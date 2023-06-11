const ProductModel = require("../../models/productModel");
const UserModel = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../../utils/validateMongodbId");
const { DUPLICATE_ITEM_ERROR_CODE } = require("../../helpers/constants");

const createProduct = asyncHandler(async (req, res) => {
  try {

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await ProductModel.create(req.body);

    return res.status(200).json({
      success: true,
      message: "product created successfully",
      data: newProduct,
    });


  } catch (error) {

    if (error.code === DUPLICATE_ITEM_ERROR_CODE) { 
      error.message = "product title already exists!";
    }

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const updateProduct = asyncHandler(async (req, res) => {

  const id = req.params;
  validateMongoDbId(id);

  try {

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await ProductModel.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found",
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: "product updated successfully!",
      data: updateProduct,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const deleteProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    
    if (!deleteProduct) { 
      return res.status(404).json({
        success: false,
        message: "product not found!",
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: "product deleted successfully!",
      data: deleteProduct,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const getaProduct = asyncHandler(async (req, res) => {
  
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findProduct = await ProductModel.findById(id);
    
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      message: "product retrieved successfully!",
      data: findProduct,
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const getAllProduct = asyncHandler(async (req, res) => {

  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = ProductModel.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page || 1;
    const limit = req.query.limit || 1;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await ProductModel.countDocuments();

      if (skip >= productCount) {
        return res.status(404).json({
          status: false,
          message: "This Page does not exists!",
          data: {}
        });
      }

    }

    const product = await query;

    return res.status(200).json({
      status: false,
      message: "Products list fetched successfully!",
      data: product
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const addToWishlist = asyncHandler(async (req, res) => {

  const { _id } = req.user;
  const { prodId } = req.body;

  try {

    const user = await UserModel.findById(_id);
    const alreadyadded = UserModel.wishlist.find((id) => id.toString() === prodId);

    if (alreadyadded) {
      let user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: "Product removed from the wishlist successfully!",
        data: user
      });
    } else {

      let user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: "Product added to the wishlist successfully!",
        data: user
      });
      
    }
  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await ProductModel.findById(prodId);
    let alreadyRated = ProductModel.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await ProductModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await ProductModel.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await ProductModel.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await ProductModel.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Rating added successfully!",
      data: finalproduct,
    });
    
  } catch (error) {

    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });

  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
