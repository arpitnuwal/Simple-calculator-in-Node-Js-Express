const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Set EJS
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index", { result: null });
});

// Handle calculation
app.post("/calculate", (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operation = req.body.operation;

    let result = "";

    if (isNaN(num1) || isNaN(num2)) {
        result = "⚠ Invalid input";
    } else {
        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "sub":
                result = num1 - num2;
                break;
            case "mul":
                result = num1 * num2;
                break;
            case "div":
                result = num2 === 0 ? "⚠ Cannot divide by zero" : num1 / num2;
                break;
        }
    }

    res.render("index", { result: result });
});

// Start server
app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});