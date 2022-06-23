const jwt = require('jsonwebtoken');

function extractUserFromHeaders(headers) {
    if (headers) {
        const token = headers.authorization?.substring('Bearer '.length);
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = {
    extractUserFromHeaders
}