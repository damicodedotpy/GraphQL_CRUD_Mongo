// ****************************JAVASCRIPT LIBRARIES******************************

// *****************************EXTERNAL LIBRARIES*******************************
const mongoose = require('mongoose');
require("dotenv").config();
// ********************************OWN LIBRARIES*********************************

// ******************************************************************************

const connectionDB = (url) => {
    try {
        mongoose.connect(url);
        console.log(`Connected to database`);
    } catch (error) {
        return new Error(`There was an error connecting to the database: ${error}`);
    }
}

module.exports = connectionDB;