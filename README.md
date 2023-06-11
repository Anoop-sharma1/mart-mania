# Mart-mania Ecommerce Project

Mart-mania is an ecommerce project written in Node.js with the Express.js framework and MongoDB as the database. It provides a robust and scalable solution for building an online marketplace.

## Packages Used

The project utilizes the following packages:

- **bcrypt**: A library for hashing and salting passwords. [Learn more](https://www.npmjs.com/package/bcrypt)
- **body-parser**: Middleware for parsing incoming request bodies. [Learn more](https://www.npmjs.com/package/body-parser)
- **cloudinary**: A cloud-based media management platform. [Learn more](https://www.npmjs.com/package/cloudinary)
- **cookie-parser**: Middleware for parsing cookies. [Learn more](https://www.npmjs.com/package/cookie-parser)
- **cors**: Middleware for enabling Cross-Origin Resource Sharing. [Learn more](https://www.npmjs.com/package/cors)
- **dotenv**: A module for loading environment variables from a .env file. [Learn more](https://www.npmjs.com/package/dotenv)
- **express**: A fast and minimalist web application framework for Node.js. [Learn more](https://www.npmjs.com/package/express)
- **express-async-handler**: A utility to handle exceptions and errors for async/await functions. [Learn more](https://www.npmjs.com/package/express-async-handler)
- **express-fileupload**: Middleware for handling file uploads. [Learn more](https://www.npmjs.com/package/express-fileupload)
- **express-validator**: Middleware for validating and sanitizing input data. [Learn more](https://www.npmjs.com/package/express-validator)
- **joi**: A powerful schema description language and data validator for JavaScript. [Learn more](https://www.npmjs.com/package/joi)
- **joi-objectid**: A plugin for validating MongoDB ObjectIds with Joi. [Learn more](https://www.npmjs.com/package/joi-objectid)
- **jsonwebtoken**: A JSON Web Token implementation for Node.js. [Learn more](https://www.npmjs.com/package/jsonwebtoken)
- **mongoose**: A MongoDB object modeling tool for Node.js. [Learn more](https://www.npmjs.com/package/mongoose)
- **morgan**: A HTTP request logger middleware for Node.js. [Learn more](https://www.npmjs.com/package/morgan)
- **multer**: Middleware for handling multipart/form-data, primarily used for file uploads. [Learn more](https://www.npmjs.com/package/multer)
- **nodemailer**: A module for sending emails from Node.js applications. [Learn more](https://www.npmjs.com/package/nodemailer)
- **perm**: A library for managing user roles and permissions. [Learn more](https://www.npmjs.com/package/perm)
- **slugify**: A package for generating slugs from strings. [Learn more](https://www.npmjs.com/package/slugify)
- **uniqid**: A simple unique ID generator. [Learn more](https://www.npmjs.com/package/uniqid)

## .env File Specification

The project requires a .env file with the following environment variables:

- **MONGODB_URL**: Specifies the URL for the MongoDB database connection.
- **JWT_SECRET**: Secret token used for JSON Web Token (JWT) generation and verification.
- **CLOUD_NAME**: The cloud name for the Cloudinary media management platform.
- **API_KEY**: API key for Cloudinary authentication.
- **SECRET_KEY**: API key for Cloudinary authentication.
- **MAIL_ID**: Email address.
- **MP**: Email password.
- **SMPT_PORT**: Port number for smtp service.

## Features

### Authentication and Authorization

- The project includes a robust authentication and authorization system for API endpoints, ensuring that only authenticated and authorized users can access certain functionalities.

### Admin Panel

#### User Management API

- This feature allows administrators to manage user accounts, including creating new users, updating user details, and deleting user accounts.

#### Product Management

- The admin panel provides APIs for managing products, including creating new products, updating product details, and deleting products.

#### Product Category

- The project includes APIs to manage product categories, allowing administrators to create, update, and delete categories for organizing products.

#### Enquiry Management

- The admin panel provides APIs for managing customer inquiries, allowing administrators to view, respond to, and track customer inquiries.

#### Blog Management

- This feature enables administrators to manage blog posts, including creating new blog posts, updating existing posts, and deleting blog posts.

#### Blog Category

- The project includes APIs for managing blog categories, allowing administrators to create, update, and delete categories for organizing blog posts.

#### Color Management

- This feature enables administrators to manage colors for products, including creating new colors, updating existing colors, and deleting colors.

#### Image Uploading

- The admin panel provides APIs for uploading images, allowing administrators to upload and manage images for products and blog posts.

### Website API

#### User Registration

- This feature allows users to register for an account on the website by providing the necessary details, such as name, email, and password.

#### User Login

- The project includes an API for user login, allowing registered users to authenticate and access their accounts.

#### Product

- The website API provides endpoints for retrieving product information, including details, images, and pricing.

#### Categories

- This feature allows users to browse products based on different categories, making it easy to find products in specific categories.

#### Best Selling Product

- The project includes an API to retrieve a list of best-selling products, providing users with popular product recommendations.

#### Compare Product

- This feature enables users to compare multiple products side by side, allowing them to make informed purchasing decisions.

#### Pagination of Product

- The website API supports pagination of product listings, ensuring efficient loading and navigation of large product catalogs.

#### Reviews

- Users can leave reviews and ratings for products, providing valuable feedback to other users and helping them make purchasing decisions.

#### Rating

- The project includes a rating system for products, allowing users to rate products based on their experience.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## Getting Started

To get the project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js and npm must be installed on your system. You can download them from [https://nodejs.org](https://nodejs.org).

### Installation

1. Clone the repository:

   ```shell
   git clone
   https://github.com/Anoop-sharma1/mart-mania.git

2. cd mart-mania

3. npm install

4. Create a .env file in the root directory of the project.

5. Start the server