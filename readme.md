# Project Overview and Objectives

This project is a backend API for a basic e-commerce system developed using expressjs. It provides essential functionalities such as user management, product management, and role-based access control, designed with scalability and maintainability in mind.

## Key Features

- **User Management:** Allows users to register, log in. only Admins have the ability to delete users.
- **Role-Based Access Control:** Differentiates between regular users and admins.
- **Product Management:** Enables authenticated users to create, update, their own products. Only Admins can delete created products.

## Architecture

The project adheres to clean architecture principles, where business logic is separated from the database layer and other external dependencies. This is achieved by limiting direct database interactions to the other classes and limiting it to service class or service level. The project was built with O.O.P paradigm in mind. 

### Modular Design

The project is organized into distinct modules, with each module encapsulating a specific aspect of the application.This structure ensures that each module is self-contained, making it easier to manage and scale the application as it grows.
Each feature is encapsulated in its own module. For example:

- The `users` module handles all user-related operations.
- The `products` module manages product-related functionality.

### Reusability

Common functionalities are abstracted into the `utils` module, which includes config, exceptions, functions, interfaces and validators, ensuring code reuse and reducing duplication.

## Project Setup

To set up the development environment:

1. **Clone the GitHub repository.**
2. **Install necessary environment variables.**
3. **Install dependencies using Yarn install** 
4. **Start the server using `yarn dev`.**

### A short explanation of your approach to handling authentication, authorization, and seeding
Made Used of Bearer token to handle authentication . Once the user logs in they get two tokens authorization token which holds important information about the logged in user with shorter expiration time and a refresh token which holds just the logged in user Id with a loger expiration time. The refresh token would be used to refreh the authorization token once it expires. 
For the authorization part , i used two middleware to determine endpoint or route users can access. RequireAdmin middleware protect and limit routes access to only admins while RequireUser middleware limits route access to both authenticated user and admins.

used mongooose script to handle seeding , so basically we only seed only if the collections are empty and seeding starts in the App class where we bootstrap our application. I Saved the data in an array and used insert many method in from mongoose to populate the colections.