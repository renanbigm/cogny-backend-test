const readline = require('readline');
const calculatePopulation = require('../reports/calculate_population_by_year');

const startCli = async (db, schema, apiData) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const yearsToSum =  await new Promise((resolve) => {
            rl.question('> Type the years and press Enter to continue (example: 2013, 2020): ', 
                (answer) => resolve(answer));
        });

        if (yearsToSum) {
            const inputYearsArray = yearsToSum.split(',').map((year) => year.trim()); // transforms the string that comes from yearsToSum to an array 
                                                                                      // and the trim function eliminates empty spaces.
            const sumToShow = calculatePopulation.inMemory(apiData, inputYearsArray);
            console.log(`> Sum result of ${yearsToSum}: ${sumToShow}`);
        } else {
            const sumToShow = await calculatePopulation.inlineSelect(db, schema);
            console.log(`> Sum result of 2018, 2019, 2020: ${sumToShow}`);
        } 
    
    } catch (e) {
      throw new Error(`Error processing answer: ${e.message}`);
    } finally {
      rl.close();
    }
}

module.exports = {
  startCli,
}
