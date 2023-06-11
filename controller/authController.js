const UserModel = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");

const register = asyncHandler(async (req, res) => {

    try {
        const email = req.body.email;
        const mobile = req.body.mobile;

        const findUser = await UserModel.findOne({ $or: [{ 'email': email }, { 'mobile': mobile }] });

        if (!findUser) {

            const newUser = await UserModel.create(req.body);

            return res.status(200).json({
                status: true,
                message: `User registered successfully!`,
                data: newUser
            });


        } else {
            return res.status(400).json({
                status: false,
                message: `User Already Exists!`,
                data: {}
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

const login = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;

        // check if user exists or not
        const findUser = await UserModel.findOne({ email });

        if (findUser && (await findUser.isPasswordMatched(password))) {

            const refreshToken = await generateRefreshToken(findUser?._id);

            const updateuser = await UserModel.findByIdAndUpdate(
                UserModel.id,
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
                message: `${findUser.email} logged in successfully!`,
                data: {
                    _id: findUser?._id,
                    firstname: findUser?.firstname,
                    lastname: findUser?.lastname,
                    email: findUser?.email,
                    mobile: findUser?.mobile,
                    token: generateToken(findUser?._id)
                }

            });
        } else {
            res.status(401).json({
                status: false,
                message: `Invalid Credentials!`,
                data: {}
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

const handleRefreshToken = asyncHandler(async (req, res) => {

    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
        return res.status(400).json({
            status: false,
            message: "No Refresh Token in Cookies!",
            data: {},
        });
    
    };

    const refreshToken = cookie.refreshToken;
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
        return res.status(400).json({
            status: false,
            message: "No Refresh token present in db or not matched!",
            data: {},
        });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || UserModel.id !== decoded.id) {
            return res.status(400).json({
                status: false,
                message: "There is something wrong with refresh token",
                data : {}
            });
        }

        const accessToken = generateToken(user?._id);

        return res.status(200).json({
            status: true,
            message: "Refresh token is valid!",
            data: accessToken
        });
    });
});

const logout = asyncHandler(async (req, res) => {

    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        return res.status(400).json({
            staus: false,
            message: "No Refresh Token in Cookies!",
            data : {}
        });
    }

    const refreshToken = cookie.refreshToken;
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).json({
            status: true,
            message: "Logged out successfully!",
            data: {}
        }); // forbidden
    }

    await UserModel.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json({
        status: true,
        message: "Logged out successfully!",
        data: {}
    }); 
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
        };

        const token = await user.createPasswordResetToken();
        
        await user.save();

        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;

        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,
        };

        // sendEmail(data);
        
        return res.status(200).json({
            status: true,
            message: `Email sent successfully!`,
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
    register,
    login,
    handleRefreshToken,
    logout,
    forgotPassword,
    resetPassword,
};
