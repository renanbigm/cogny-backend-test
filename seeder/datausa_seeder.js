const axios = require('axios');
const { DATABASE_SCHEMA } = require('../config');

const URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

const seedApiData = async (db) => {
    try {
        const response = await axios.get(URL);
        const { data } = response.data;
        console.log('apagar Truncate');
        await db.query(`TRUNCATE TABLE ${DATABASE_SCHEMA}.api_data`); 
        await Promise.all(data.map((report) => {
            return db[DATABASE_SCHEMA].api_data.insert({
                doc_record: report,
            });
        }));    
        
        console.log('Data has been successfully registered');
        return data;
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }
};

module.exports = {
    seedApiData,
};
