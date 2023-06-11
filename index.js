const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const fileUpload = require('express-fileupload');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();

app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//web routes registration
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/cart", require("./routes/cartRoute"));
app.use("/api/v1/order", require("./routes/orderRoute"));
app.use("/api/v1/wishlist", require("./routes/wishlistRoute"));
app.use("/api/v1/product", require("./routes/productRoute"));
app.use("/api/v1/blog", require("./routes/blogRoute"));
app.use("/api/v1/category",  require("./routes/productCategoryRoute"));
app.use("/api/v1/blog-category", require("./routes/blogCategoryRoute"));
app.use("/api/v1/brand", require("./routes/brandRoute"));
app.use("/api/v1/color", require("./routes/colorRoute"));
app.use("/api/v1/enquiry", require("./routes/enquiryRoute"));
app.use("/api/v1/rating", require("./routes/ratingRoute"));

//admin routes registration
app.use("/admin/api/v1/auth", require("./routes/admin/authRoute"));
app.use("/admin/api/v1/user", require("./routes/admin/userRoute"));
app.use("/admin/api/v1/blog", require("./routes/admin/blogRoute"));
app.use("/admin/api/v1/category", require("./routes/admin/productCategoryRoute"));
app.use("/admin/api/v1/blogcategory", require("./routes/admin/blogCategoryRoute"));
app.use("/admin/api/v1/enquiry", require("./routes/admin/enquiryRoute"));
app.use("/admin/api/v1/coupon", require("./routes/admin/couponRoute"));
app.use("/admin/api/v1/color", require("./routes/admin/colorRoute"));
app.use("/admin/api/v1/brand", require("./routes/admin/brandRoute"));
app.use("/admin/api/v1/order", require("./routes/admin/orderRoute"));
app.use("/admin/api/v1/product", require("./routes/admin/productRoute"));

//handle incorrect routes
app.use("*", (req, res) => {
  return res.status(400).json({
    status: false,
    message: "Incorrect route!",
    data : {}
  });
});

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
