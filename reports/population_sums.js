const { DATABASE_SCHEMA } = require('../config');

const showSums = async (apiData, db) => {
    // const apiData = db[DATABASE_SCHEMA].api_data;

    console.log(`Save in nodejs memo: populationSum = ${saveSumToMemo(apiData)}`);
}


const saveSumToMemo = (apiData) => {
    const filteredYears = ['2018', '2019', '2020'];

    const populationSum = apiData.reduce((acc, { Year, Population }) => //  The function receives an array of data with columns Year and Population
        acc + (filteredYears.includes(Year) ? Population : 0),          //  Sums the populations of the years 2018, 2019 and 2020
    0);

    return populationSum;
}

module.exports = {
    showSums,
}
