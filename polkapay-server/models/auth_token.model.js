module.exports = (sequelize, DataTypes) => {
    
    const AuthToken = sequelize.define('AuthToken', {
        token: Sequelize.STRING
    }, {});

    AuthToken.associate = function(models) {
        AuthToken.belongsTo(models.User)
    };

    // generates a random 15 character token and
    // associates it with a user
    AuthToken.generate = async function(UserId) {
        if (!UserId) {
            throw new Error('AuthToken requires a user ID')
        }

        let token = '';

        const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 15; i++) {
            token += possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
        }

        return AuthToken.create({ token, UserId })
    }

    return AuthToken;
};