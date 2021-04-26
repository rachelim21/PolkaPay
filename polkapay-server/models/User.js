const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    publisher: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true
    },
    amount: {
      type: Sequelize.BIGINT,
      defaultValue: 10,
    },
  });
  
  User.associate = function ({ AuthToken, Article, UserArticle }) {
    User.hasMany(AuthToken);
    User.belongsToMany(Article, { through: UserArticle });
  };

  User.prototype.publish = async function(article) {
    const { Article } = sequelize.models;
    const user = this;

    let thisArticle = await Article.create(
      Object.assign(article)
    );
    
    await user.addArticle(thisArticle, { through: { role: 'published' }});

    return { user, thisArticle }
  };

  User.prototype.purchase = async function(article) {
    const { Article } = sequelize.models;
    const user = this;

    const thisArticle = await Article.findOne({where: { id: article.id }});
    
    await user.addArticle(thisArticle, { through: { role: 'purchased' }});
    user.update({ amount: user.amount - thisArticle.cost })

    return { user, thisArticle }
  };

  // This is a class method, it is not called on an individual
  // user object, but rather the class as a whole.
  // e.g. User.authenticate('user1', 'password1234')
  User.authenticate = async function(email, password) {

    const user = await User.findOne({ where: { email } });

    // bcrypt is a one-way hashing algorithm that allows us to 
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  }

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function() {
    const { AuthToken } = sequelize.models;
    const user = this;

    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const authToken = await AuthToken.generate(this.id);

    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken);

    return { user, authToken }
  };

  User.prototype.logout = async function (token) {
    // destroy the auth token record that matches the passed token
    sequelize.models.AuthToken.destroy({ where: { id: token.id } });
  };
  
  return User;
};