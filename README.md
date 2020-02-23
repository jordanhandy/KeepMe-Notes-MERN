# KeepMe App
## Synopsis
The KeepMe app is a clone of Google Keep.  THis was a fun side project I completed, with the help of
the London App Brewery

## Components
This project consists of:
* A Frontend built with ReactJS
* A Backend built with Express
* Various Middleware(s)
* Database for persistent storage is on MongoDB Atlas

# To Use:
1. In the root directory, run "npm install".  This will install the server dependencies
2. In the "client" directory, run "npm install".  This will install the React frontend dependencies.
3. "npm start" from the client directory should open the React frontend on Localhost 3000
4. For the backend server, I used nodemon to consistently check for changes.
    4. "nodemon server.js" should start the server separately on it's on
## To Run Concurrently
1. "npm run build" will build the app for production
2. Using serve can serve the app up on Localhost

# Changelog
## v1.5 - Deployment with Express Backend
Express Backend functionality added