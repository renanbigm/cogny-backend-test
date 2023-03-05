const massive = require('massive');
const { DATABASE_SCHEMA, DATABASE_URL } = require('../config');

const connect = async () => {
    console.log('Connecting to database');
    try {
        const db = await massive({
            connectionString: DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }, {
            // Massive Configuration
            scripts: process.cwd() + '/migration',
            allowedSchemas: [DATABASE_SCHEMA],
            whitelist: [`${DATABASE_SCHEMA}.%`],
            excludeFunctions: true,
        }, {
            // Driver Configuration
            noWarnings: true,
            error: function (err, client) {
                console.log(err);
            }
        });
        console.log('Connected successfully to the database');
    
        return db;
    } catch (e) {
        throw new Error(`Failed to connect with database: ${console.log(e)}`);
    }
};

module.exports = {
  connect,
};