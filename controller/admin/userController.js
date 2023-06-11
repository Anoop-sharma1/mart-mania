const UserModel = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await UserModel.findById(id);
    
    if (!getaUser) { 
      return res.status(404).json({
        status: false,
        message: `User not found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `User retrieved successfully!`,
      data: getaUser
    });

  } catch (error) {
    
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
      
  }
});

const getLoggedInUser = asyncHandler(async (req, res) => {

  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const getaUser = await UserModel.findById(id);
    
    if (!getaUser) { 
      return res.status(404).json({
        status: false,
        message: `User not found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `User retrieved successfully!`,
      data: getaUser
    });

  } catch (error) {
    
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
      
  }
});

const blockUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  try {
    const blockusr = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    if (!blockusr) {
      return res.status(404).json({
        status: false,
        message: `User not found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `User blocked successfully!`,
      data: blockusr
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });  
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const unblock = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    
    if (!unblock) { 
      return res.status(404).json({
        status: false,
        message: `User not found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `User unblocked successfully!`,
      data: unblock
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {

    const allUsers = await UserModel.find();
    
    if (allUsers.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No users found!`,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      message: `All users retrieved successfully!`,
      data: allUsers
    });

  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const profile = asyncHandler(async (req, res) => {
  try {
    const { _id: id } = req.user;
    validateMongoDbId(id);

    const user = await UserModel.findById(id);
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No image is selected!',
        data: {}
      });
    }

    sampleFile = req.files.image;
    uploadPath = 'public/images/admin/profile/' + sampleFile.name.replaceAll(' ', '-');
    
    if (!sampleFile.mimetype.startsWith('image/')) {
      return res.status(500).json({
        status: false,
        message: "Only png, jpg, jpeg file type is accepted!",
        data: {}
      });
    }
    
    sampleFile.mv(uploadPath, async function (err) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
          data: {}
        });
      }

      user.profile = uploadPath;
      await user.save();

      return res.status(200).json({
        status: true,
        message: "Profile updated successfully!",
        data: await UserModel.findById(id)
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: {}
    });
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const { _id: id } = req.user;
    validateMongoDbId(id);

    await UserModel.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      status: true,
      message: "User updated successfully!",
      data : await UserModel.findById(id)
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
    getaUser,
    blockUser,
    unblockUser,
    getAllUsers,
    getLoggedInUser,
    profile,
    update
};
