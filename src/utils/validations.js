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

module.exports = {
  validateInput,
}