const axios = require('axios');
const { DATABASE_SCHEMA } = require('./config');

const URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

const seedApiData = async (db) => {
  try {
    const { data } = await axios.get(URL);

    const result = await db[DATABASE_SCHEMA].api_data.insert({
      doc_record: data,
    });

    console.log('Status: 200, Dados foram registrados com sucesso: ', result);
  } catch (error) {
    console.error('Status: 400, Ocorreu um erro: ', error);
  }
};

module.exports = {
  seedApiData,
};
