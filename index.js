const { DATABASE_SCHEMA, SHOW_PG_MONITOR } = require('./config');
const monitor = require('pg-monitor');
const { seedApiData } = require('./src/seeder/datausa_seeder');
const { connect } = require('./src/db');
const { migrationUp } = require('./migration/database_migration');
const { getDatausaRequest } = require('./src/utils/httpUtils');
const { startCli } = require('./src/utils/cli');

const datausaURL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

// Call start
(async () => {
    const db = await connect();
    const schema = DATABASE_SCHEMA;
    const tableName = 'api_data';
    const apiData = await getDatausaRequest(datausaURL);

    if (!monitor.isAttached() && SHOW_PG_MONITOR === 'true') {
        monitor.attach(db.driverConfig);
    }
    
    try {
        await migrationUp(db, schema);
        await seedApiData(db, schema, tableName, apiData);

        await startCli(db, schema, apiData);

    } catch (e) {
        throw new Error(`Something went wrong: ${e.message}`);
    }
})();
