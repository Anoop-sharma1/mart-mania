const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: true,
      message: "User updated successfully!",
      data: updatedUser
    });

  } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: {}
      });
  }
});

// save user Address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );

    if(!updatedUser) {
      return res.status(404).json({
        status: false,
        message: `User not found!`,
        data : {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `Address saved successfully!`,
      data : updatedUser
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);

  try {
    const user = await UserModel.findById(_id);

    user.password = password;
    const updatedPassword = await user.save();

    return res.status(200).json({
      status: true,
      message: "Password Updated Successfully!",
      data: updatedPassword,
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
  updatedUser,
  updatePassword,
  saveAddress,
};
