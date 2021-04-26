const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("Article", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    publishedAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
  });

  const UserArticle = sequelize.define('UserArticle', {
    role: Sequelize.STRING
  });

  Article.associate = function ({ User }) {
    Article.belongsToMany(User, { through: UserArticle });
  };
  
  return Article;
};