// UUID lib
const uuidv4 = require("uuid/v4");

// Helper to set a random UUID
const getNewId = () => {
    return uuidv4();
};

// Helper to new Date()
// As we need to add to our data the fields "created_at" or "updated_at"
// and populated with a date we use the Date Module for it
// That result is the server date in ISO 8601
const newDate = () => {
    // converting Date to be a string
    return new Date().toUTCString();
};

// Common response format for each and every request
common_response = () => {
    return {
        data: {},
        status: 200,
        message: ""
    }
}

// We export the methods to be accessible
module.exports = {
    getNewId,
    newDate,
    common_response
};
