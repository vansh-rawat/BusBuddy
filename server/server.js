const express = require('express');
const app = express();
require('dotenv').config()
const dbconfig = require("./config/dbconfig");


const port = process.env.PORT || 8000;
app.use(express.json())

const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings', bookingsRoute);

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => console.log('listening on port', port))
