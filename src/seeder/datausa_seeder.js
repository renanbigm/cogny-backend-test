const { insertApiData } = require("../services/db_service");

const seedApiData = async (db, schema, table, data) => {
    try {
        await db.query(`TRUNCATE TABLE ${schema}.api_data`); 

        await Promise.all(data.map((report) =>                  // promise.all wait for all inserts to complete before proceeding with the next step in the code.
            insertApiData(db, schema, table, report)));         // Use the map method to iterate over each report object within the data array.
        
        console.log(`Data has been successfully registered\n\n`);
    } catch (e) {
        throw new Error(`Failed to seed api data: ${e.message}`);
    }
};

module.exports = {
    seedApiData,
};
