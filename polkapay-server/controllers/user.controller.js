const db = require("../models");
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;

// grab the User model from the models folder, the sequelize
// index.js file takes care of the exporting for us and the
// syntax below is called destructuring, its an es6 feature
const { User } = db;

/* Register Route
========================================================= */
// Create and Save a new User
exports.create = async (req, res) => {
    console.log("REGISTERING NEW USER")
    console.log(req.body)

    // hash the password provided by the user with bcrypt so that
    // we are never storing plain text passwords. This is crucial
    // for keeping your db clean of sensitive data
    const hash = bcrypt.hashSync(req.body.password, 10);
  
    try {
      // create a new user with the password hash from bcrypt
      let user = await User.create(
        Object.assign(req.body, { password: hash })
      );
  
      // data will be an object with the user and it's authToken
      let data = await user.authorize();
  
      // send back the new user and auth token to the
      // client { user, authToken }
      return res.json(data);
  
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
};

// Publish an article for this User (Publisher)
exports.publish = async (req, res) => {
    console.log("PUBLISHING ARTICLE")
    console.log(req.body)

    const { user, article } = req.body

    try {
        let currentUser = await User.findByPk(user.id)
        let data = await currentUser.publish(article);
        return res.json(data);
      } catch(err) {
          console.log(err);
          return res.status(400).send(err);
      }
};

// Purchase an article for this User (Reader)
exports.purchase = async (req, res) => {
    console.log("PURCHASING ARTICLE")
    console.log(req.body)

    const { user, article } = req.body

    try {
        let currentUser = await User.findByPk(user.id)
        let data = await currentUser.purchase(article);
        return res.json(data);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
};

exports.findPublished = async (req, res) => {
    try {
        let currentUser = await User.findByPk(req.params.id)
        let data = await currentUser.getArticles()
        return res.json(data);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
};

exports.findPurchased = async (req, res) => {
    try {
        let currentUser = await User.findByPk(req.params.id)
        let data = await currentUser.getArticles()
        return res.json(data);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};

// Find all reader Users
exports.findAllReaders = (req, res) => {
  
};

// Find all publisher Users
exports.findAllPublishers = (req, res) => {
  
};

/* Me Route - get the currently logged in user
========================================================= */
// Find a single User with an id
exports.findOne = (req, res) => {
    if (req.user) {
        return res.send(req.user);
    }
    res.status(404).send(
        { errors: [{ message: 'missing auth token' }] }
    );
};

// Update a User by the id in the request
exports.update = (req, res) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};

/* Login Route
========================================================= */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // if the username / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!email || !password) {
        return res.status(400).send(
        'Request missing email or password param'
        );
    }

    try {
        let user = await User.authenticate(email, password)
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).send('invalid email or password');
    }

};

/* Logout Route
========================================================= */
exports.logout = async (req, res) => {

    // because the logout request needs to be send with
    // authorization we should have access to the user
    // on the req object, so we will try to find it and
    // call the model method logout
    const { user, authToken } = req.body

    // we only want to attempt a logout if the user is
    // present in the req object, meaning it already
    // passed the authentication middleware. There is no reason
    // the authToken should be missing at this point, check anyway
    if (user && authToken) {
        let thisUser = await User.findByPk(user.id);
        await thisUser.logout(authToken);
        return res.status(204).send()
    }

    // if the user missing, the user is not logged in, hence we
    // use status code 400 indicating a bad request was made
    // and send back a message
    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );
};
