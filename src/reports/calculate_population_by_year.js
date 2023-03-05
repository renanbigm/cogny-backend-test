const inlineSelect = async (db, schema) => {
    try {
        const [{ population_sum }] = await db.query(`
            SELECT SUM((doc_record ->> 'Population')::int) as population_sum    
                FROM ${schema}.api_data
                WHERE doc_record ->> 'Year' IN ('2018', '2019', '2020')
        `); // function from PostgreSQL ->> is used to access the "Year" and "Population" key of the jsonb "doc_record". ::int is used to covert string to number.

        return population_sum;
    } catch (e) {
        throw new Error(`Failed to calculate population sum: ${e.message}`);
    }
} 

const validateInput = (apiData, inputYears) => {
    const validYears = apiData.map(({ Year }) => Year);

    if (inputYears.length < 2) {
        throw new Error(`It is necessary to enter at least two different years`);
    }

    if (!inputYears.every((year) => validYears.includes(year))) {
        throw new Error(`Years should be between 2013 to 2020`);
    }
    
    return inputYears;
}

const inMemory = (apiData, inputYears) => {
    const validYears = validateInput(apiData, inputYears);

    const populationSum = apiData.reduce((acc, { Year, Population }) => //  The function receives an array of data with columns Year and Population.
        acc + (validYears.includes(Year) ? Population : 0),             //  Sums the populations of the years 2018, 2019 and 2020.
    0);

    return populationSum;
}

module.exports = {
    inlineSelect,
    inMemory,
}
