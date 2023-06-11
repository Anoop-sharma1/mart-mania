const ProductModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  try {
    const product = await ProductModel.findById(prodId);

    if (!product) {
      return res.status(400).json({
        status: false,
        message: "product not found@",
        data: {}
      });
    }
    
    let alreadyRated = product.ratings.find(
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
      message: "rating added successfully",
      data: finalproduct
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
  rating,
};
