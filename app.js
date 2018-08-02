const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// = Route files ===============
const budgetRoutes = require("./api/routes/budgets");
const transactionRoutes = require("./api/routes/transactions");
const userRoutes = require("./api/routes/users");
const balanceRoutes = require("./api/routes/balances");
const loginRoutes = require("./api/routes/login");
const registerRoutes = require("./api/routes/register");

// = Middleware ================
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//= CORS =======================
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, PUT");
        return res.status(200).json({});
    }
    next();
})

// = Route Middleware ==========
app.use("/api/budgets", budgetRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/balances", balanceRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);

// = Error messaging for missing resources or system error
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
}); 

app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;