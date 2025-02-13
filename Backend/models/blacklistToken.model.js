// Importing required modules
const mongoose = require('mongoose');

// Create a schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate tokens are stored
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current time
        expires: 86400, // 24 hours in seconds
    },
});

// Create the model for blacklisted tokens
const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;
