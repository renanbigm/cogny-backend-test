const insertApiData = async (db, schema, table, report) => {
  try {
      await db[schema][table].insert({              
              api_name: 'datausa',                         // For each report object, insert a new record in the api_data database table
              doc_id: report['ID Nation'],
              doc_name: `${report.Nation}, ${report.Year}`,
              doc_record: report,
          });    
  } catch (e) {
      throw new Error(`Failed to seed api data: ${e.message}`);
  }
};

module.exports = {
  insertApiData,
};
