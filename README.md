# MERN Stack E-commerce Project

This project is a MERN stack-based e-commerce platform, including features for user registration and login, product management, and cart management. Below are the details of the implemented features.

## Features

### User Authentication

- **Register:** Users can register an account.
- **Login:** Users can log in and receive a JWT token for authentication.

### Product Management

- **Add Product:** Sellers can add new products.
- **Edit Product:** Sellers can edit their products.
- **Delete Product:** Sellers can delete their products.
- **List Products:** Both buyers and sellers can list products with pagination.

### Cart Management

- **Add to Cart:** Buyers can add products to their cart.
- **Update Cart:** Buyers can increase or decrease the quantity of products in their cart.
- **Delete Cart Item:** Buyers can delete specific items from their cart.
- **Clear Cart:** Buyers can clear all items from their cart.
- **View Cart:** Buyers can view all items in their cart, including a summary with the total cost.

## Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/your-username/mern-ecommerce.git
   ```
2. Navigate to the project directory.
   ```sh
   cd mern-ecommerce
   ```
3. Install dependencies for both the server and client.
   ```sh
   npm install
   cd client
   npm install
   cd ..
   ```
4. Set up environment variables in a `.env` file for both the server and client.
   ```env
   # Server .env file
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_DURATION=your_jwt_duration
   ```

## Usage

1. Start the development server.

   ```sh
   npm run dev
   ```

2. The server will be running at `http://localhost:5000` and the client at `http://localhost:3000`.

## API Endpoints

### User Routes

- **POST** `/register` - Register a new user.
- **POST** `/login` - Login a user.

### Product Routes

- **GET** `/all` - List all products.
- **POST** `/add` - Add a new product.
- **GET** `/details/:id` - Get product details.
- **DELETE** `/delete/:id` - Delete a product.
- **PUT** `/edit/:id` - Edit a product.
- **POST** `/productList/buyer` - List products for buyers.
- **POST** `/productList/seller` - List products for sellers.

### Cart Routes

- **POST** `/add` - Add an item to the cart.
- **DELETE** `/clear` - Clear the cart.
- **DELETE** `/delete/:id` - Delete a specific item from the cart.
- **PUT** `/edit/:id` - Increase or decrease item quantity in the cart.
- **GET** `/list` - View all items in the cart.
- **GET** `/itemCount` - Get the count of items in the cart.

## Middleware

- **Authorization**: Ensures routes are accessed by the appropriate user roles (Buyer, Seller, User).
- **Validation**: Validates request bodies and MongoDB IDs.

## Under Development

Please note that this website is currently under development. Some features, such as the homepage, are still being built. We appreciate your patience as we work to complete the project.
