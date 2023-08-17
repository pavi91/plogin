// Importing Libraries that we installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const initializePassport = require("./passport-config");

const users = [];

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs"); // Set EJS as the view engine

// Routes
app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
});

app.get('/register', (req, res) => {
    res.render("register.ejs");
});

app.get('/reset', (req, res) => {
    res.render("reset.ejs");
});

app.get('/about', (req, res) => {
    res.render("about.ejs");
});

app.get('/contact', (req, res) => {
    res.render("contact.ejs");
});

app.post('/register', async (req, res) => { // Mark the function as async
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Provide a salt round value
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(users);
        res.redirect("/login");

    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }
});

// End Routes

app.listen(3000);
