const axios = require('axios');
const { DATABASE_SCHEMA } = require('../config');

// const dataBase = db[DATABASE_SCHEMA];
const URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

const seedApiData = async (db) => {
    try {
        const { data } = await axios.get(URL);
        // const { data } = response.data;

        const result = await db[DATABASE_SCHEMA].api_data.insert({
            doc_record: data,
        });    

        // const result = await Promise.all(data.map((report) => {
        //     return db[DATABASE_SCHEMA].api_data.insert({
        //         doc_record: report,
        //     });
        // }));    
        
        console.log('Data has been successfully registered: ', result);
        return data.data;
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }
};

module.exports = {
    seedApiData,
};
