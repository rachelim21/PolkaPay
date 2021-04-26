var express = require('express');
var router = express.Router();

const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/", users.create);

// Purchase an article
router.post("/purchase", users.purchase);

// Login a User
router.post("/login", users.login);

// Logout a User
router.post("/logout", users.logout);

// Retrieve all Users
router.get("/", users.findAll);

// Retrieve all publisher Users
router.get("/publishers", users.findAllPublishers);

// Retrieve all reader Users
router.get("/readers", users.findAllReaders);

// Retrieve a single User with id
router.get("/:id", users.findOne);

// Update a User with id
router.put("/:id", users.update);

// Delete a User with id
router.delete("/:id", users.delete);

// Create a new User
router.delete("/", users.deleteAll);

module.exports = router;
