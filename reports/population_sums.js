const { DATABASE_SCHEMA } = require('../config');

const showSums = async (apiData, db) => {
    
    console.log(`(a): ${saveSumToMemo(apiData)}`);
    console.log(`(b): ${await getSumBySelect(db)}`);
    // console.log(`(b): populationSum = ${await getSumBySelect(db)}`);
}



const getSumBySelect = async (db) => {
    const [{ population_sum }] = await db.query(`
        SELECT SUM((doc_record ->> 'Population')::int) as population_sum    
            FROM ${DATABASE_SCHEMA}.api_data
            WHERE doc_record ->> 'Year' IN ('2018', '2019', '2020')
    `); // function from PostgreSQL ->> is used to access the "Year" and "Population" key of the jsonb "doc_record". :: is used to covert string to number
    
    return population_sum;
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
