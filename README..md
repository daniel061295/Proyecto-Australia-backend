# Australia Backend Project

## Overview

This project is the backend service for the Australia application. It provides APIs and handles the business logic for the application.

## Features

- User authentication and authorization
- Data management and storage
- API endpoints for various functionalities
- Error handling and logging

## Project Structure

.env .gitattributes .gitignore api_key.json build/ package.json src/ api/ categories/ clients/ dates/ imagesServices/ meetings/ menus/ profiles/ schedules/ services/ states/ submenus/ users/ src/app.js config/ src/config/database.js src/config.js src/index.js libs/ src/libs/BaseController.js src/libs/BaseModel.js models/ ... middlewares/ ... static/ 10enero.jpeg 15enero.jpeg docs/ foto_documento_fondo_blanco_3_4.jpg foto_documento_fondo_blanco.png foto_fondo_blanco.jpg lumina-logo.png

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Sequelize
- Zod for validations

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/Australia.git
  ```
2. Navigate to the backend directory:
  ```bash
  cd Australia/backend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

## Usage

1. Start the server:
  ```bash
  npm start
  ```
2. The server will be running at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.