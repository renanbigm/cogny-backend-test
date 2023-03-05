const axios = require('axios');
const { DATABASE_SCHEMA } = require('../config');

const URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

const seedApiData = async (db) => {
    try {
        const response = await axios.get(URL);
        const { data } = response.data;

        await Promise.all(data.map((report) => {               // promise.all wait for all inserts to complete before proceeding with the next step in the code.
            return db[DATABASE_SCHEMA].api_data.insert({       // Use the map method to iterate over each report object within the data array.
                api_name: 'datausa',                           // For each report object, insert a new record in the api_data database table
                doc_id: report['ID Nation'],
                doc_name: `${report.Nation}, ${report.Year}`,
                doc_record: report,
            });
        }));    
        
        console.log('Data has been successfully registered');
        return data;
    } catch (e) {
        throw new Error(`Failed to seed api data: ${e.message}`);
    }
};

module.exports = {
    seedApiData,
};
