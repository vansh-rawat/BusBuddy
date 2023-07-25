const mongooseUser = require('mongoose');

const userSchema = new mongooseUser.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

        isBlocked: {
            type: Boolean,
            default: false,

        },
    },

    {
        timestamps: true,
    }

);

module.exports = mongooseUser.model('users', userSchema);


