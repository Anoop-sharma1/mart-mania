const User = require("../models/userModel");
const mongoose = require("mongoose");
require("dotenv").config();

//connect mongoose
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
// Function call
User.create([
    {
        firstname: "Demo",
        lastname: "User",
        email: "demo@yopmail.com",
        mobile: 7777777777,
        password: "demo@digi",
    },
    {
        firstname: "Admin",
        lastname: "User",
        email: "admin@yopmail.com",
        mobile: 8888888888,
        password: "admin@digi",
        role: "admin",
    }]
).then(function () {
    console.log("User inserted")  // Success
    mongoose.disconnect();

}).catch(function (error) {
    console.log(error)      // Failure
    mongoose.disconnect();

});