# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Restaurant Management System
A full-stack application for managing orders, products, and users in a restaurant setting. Customers can place orders, view order history, and track order statuses. Admins have access to manage users, products, and orders.

Features
For Customers:
Authentication:

Customers can sign up and log in securely.
Session management for authenticated users.

Order Management:

Customers can browse products and add items to their cart.
Place orders with details like delivery address and payment information.
View past orders and check their status (pending, dispatched, delivered).

For Admins:
User Management:

Admins have access to manage user accounts.
Create, update, and delete user accounts as necessary.

Product Management:

Admins can add new products, update existing ones, and delete products.
Manage product categories and descriptions.

Order Management:

View all orders placed by customers.
Update order statuses (pending, dispatched, delivered).
View order details including customer information and products ordered.

Technologies Used

Frontend:
React.js for building the user interface.
Redux for state management.
Tailwind CSS for styling components.
Axios for handling asynchronous HTTP requests.

Backend:
Node.js and Express.js for building RESTful APIs.
MongoDB as the database using Mongoose for object modeling.
JWT (JSON Web Tokens) for secure authentication and authorization.
Firebase Cloud Messaging (FCM) for push notifications.
Setup Instructions

Clone the repository:

git clone https://github.com/bajpaisushil/Restaurant_FullStack-Client.git

cd repository

Install dependencies:
cd frontend
npm install

cd ../backend

npm install
Set up environment variables:
Create a .env file in the backend directory and configure environment variables like MongoDB connection URI, JWT secret, etc.

Run the application:
Start the backend server:

cd backend
npm start

Start the frontend development server:

cd frontend
npm start

Access the application:
Open your browser and navigate to http://localhost:3000 to view the application.

# Previews

![Screenshot 2024-06-29 171913](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/36bea05f-7802-4835-b834-8fb117cb068f)
![Screenshot 2024-06-29 172138](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/bb47c03b-3ddc-4d07-aefb-8935bb4598b6)
![Screenshot 2024-06-29 172129](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/1793716f-5479-41bf-8e9a-4e3942fd1b0c)
![Screenshot 2024-06-29 172045](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/95bc42f1-fb05-48e9-99b5-6b44ebe9ba5f)
![Screenshot 2024-06-29 172034](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/4cafff13-5d64-4b55-8349-9622eb249320)
![Screenshot 2024-06-29 172003](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/5067a03c-3ad7-402c-b498-54f7933d54d5)
![Screenshot 2024-06-29 171956](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/b2c76024-b1c7-4110-a34c-9e134d4a7fec)
![Screenshot 2024-06-29 171932](https://github.com/bajpaisushil/Restaurant_FullStack-Client/assets/111970311/010385a7-d948-4647-9743-e5d68cf329af)

# LIVE At: https://resticious.vercel.app
