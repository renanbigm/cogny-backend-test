const { insertApiData } = require("../services/db_service");

const seedApiData = async (db, schema, table, data) => {
    try {
        await Promise.all(data.map((report) =>                  // promise.all wait for all inserts to complete before proceeding with the next step in the code.
            insertApiData(db, schema, table, report)));         // Use the map method to iterate over each report object within the data array.
        
        console.log('Data has been successfully registered');
    } catch (e) {
        throw new Error(`Failed to seed api data: ${e.message}`);
    }
};

module.exports = {
    seedApiData,
};


// For each report object, insert a new record in the api_data database table.
