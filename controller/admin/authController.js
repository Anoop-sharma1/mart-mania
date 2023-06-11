const UserModel = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");
const { generateRefreshToken } = require("../../config/refreshtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");
// admin login

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
      // check if user exists or not
      const findAdmin = await UserModel.findOne({ email });
    
      if (!findAdmin) {
        return res.status(404).json({
          status: false,
          message: `Email ${email} not registered!`,
          data : {}
        });
      }
    
      if (findAdmin.role !== "admin") {
        return res.status(401).json({
          status: false,
          message: `Not Authorised!`,
          data : {}
        });
      };
    
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
    
      const updateuser = await UserModel.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
        
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
    
      return res.status(200).json({
        status: true,
        message: `${findAdmin?.firstname} logged in successfully!`,
        data: {
          _id: findAdmin?._id,
          firstname: findAdmin?.firstname,
          lastname: findAdmin?.lastname,
          email: findAdmin?.email,
          mobile: findAdmin?.mobile,
          token: generateToken(findAdmin?._id),
        }
      });
    } else {
      return res.status(403).json({
        status: false,
        message: `Invalid Credentials!`,
        data : {}
      });
    }
  } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        data : {}
      });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {

  const { email } = req.body;

  try {
      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(400).json({
              status: false,
              message: `User with email ${email} not found!`,
              data: {}
          });
      } else if (user.role != 'admin') {
          return res.status(400).json({
              status: false,
              message: `${email} is not an admin!`,
              data: {}
          });
      }

      const token = await user.createPasswordResetToken();
      
      await user.save();

      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</>`;

      const data = {
          to: email,
          text: "Hey User",
          subject: "Forgot Password Link",
          htm: resetURL,
      };

      sendEmail(data);
      
      return res.status(200).json({
          status: true,
          message: `Please check your email to reset the password!`,
          data: token
      });

  } catch (error) {
      return res.status(400).json({
          status: false,
          message: error.message,
          data: {}
      });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
      return res.status(400).json({
          status: false,
          message: `Token Expired, Please try again later!`,
          data: {}
      });
  }
      
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return res.status(200).json({
      status: true,
      message: `Password Reset Successfully!`,
      data: user
  });
});

module.exports = {
  login,
  forgotPassword,
  resetPassword
};
