const mongoose = require('./dbconfig/mongodb.connect');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors())
app.use(routes);

app.listen(port, () => {
    console.log("server started on " + port);
});