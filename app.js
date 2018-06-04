const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./src/routes");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use((error, request, response, next) =>  {
    if (error) {
        response.status(error.status).json({
            hasErrors: true,
            message: error.message,
            response: {}
        });
    }
    else {
        next();
    }
});
app.use('/voters', express.static('./public/voters'));

module.exports = app;