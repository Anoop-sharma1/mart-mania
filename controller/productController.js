const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");


const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findProduct = await ProductModel.findById(id);
    
    if (!findProduct) { 
      return res.status(400).json({
        status: false,
        message: "Product not found!",
        data: {}
      });
    }

    return res.status(200).json({
      status: false,
      message: "Product fetched successfully!",
      data: findProduct
    });

  } catch (error) {
      return res.status(400).json({
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
      const productCount = await Product.countDocuments();

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
      return res.status(400).json({
        status: false,
        message: error.message,
        data: {}
      });
  }
});

module.exports = {
  getaProduct,
  getAllProduct,
};
