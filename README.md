# Gaming Store - Frontend

React + Vite Project - build a website

Check the demo mode here: https://adirdahari.github.io/Gaming-Store-Client/

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Built With](#built-with)
- [Extras](#extras)

## About

Our React Second-Hand Shop is an online platform designed to facilitate the buying and selling of second-hand games.

### Installation

Step-by-step instructions on how to install dependencies and set up the project.

```bash
# `Clone the repository`
git clone https://github.com/AdirDahari/Gaming-Store-Front.git

copy of the project

# `Install dependencies`
npm install

when we download the project for the first time we must execute npm i to install all dependencies

### `Connect to server`
.env

In the .env file the variable VITE_SERVER_URL contain the URL address
```

### Folder Structure

- **`/public`:** Images files.
- **`/src`:** The root directory for source code.
  - **`/components`:** Components used in more than one place.
  - **`/guard`:** Checks permissions before transferring to the router is required.
  - **`/hooks`:** Custom hooks.
  - **`/layout`:** Layers that contain header, dynamic main content and footer.
  - **`/messages`:** Pop-up messages according to user activity, use toastify library.
  - **`/pages`:** Components representing different pages/routes in your application.
  - **`/routes`:** React router dom library.
  - **`/service`:** Utility functions.
  - **`/store`:** Redux library.
  - **`/style`:** Css files.
  - **`/validation`:** Validate schema with Joi library.
  - **`App.css`:** The main style file.
  - **`App.jsx`:** The main application file.
  - **`index.css`:** The root css file.
  - **`main.jsx`:** The root application file connect to HTML.

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
- [Joi](https://joi.dev/) - Object schema description language and validator for JavaScript objects
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) - Library for decoding JWTs
- [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps

### Extras

- **`jwt`:** Response json with \_id (user id) and isAdmin (true or false).
- **`Update user`:** Update user not included email and password.
- **`bonus`:** Admin can change a regular user to admin.
- **`Users postman api link`:** https://documenter.getpostman.com/view/29582728/2sA2xjzrRx
- **`Posts postman api link`:** https://documenter.getpostman.com/view/29582728/2sA2xjzrat
