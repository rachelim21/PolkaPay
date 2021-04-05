module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };