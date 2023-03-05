const { DATABASE_SCHEMA, DATABASE_URL, SHOW_PG_MONITOR } = require('./config');
const massive = require('massive');
const monitor = require('pg-monitor');
const { seedApiData } = require('./seeder/datausa_seeder');
const { showSums } = require('./reports/calculate_population_by_year');


// Call start
(async () => {
    console.log('Connecting to database');

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

    if (!monitor.isAttached() && SHOW_PG_MONITOR === 'true') {
        monitor.attach(db.driverConfig);
    }

    const execFileSql = async (schema, type) => {
        return new Promise(async resolve => {
            const objects = db['user'][type];

            if (objects) {
                for (const [key, func] of Object.entries(objects)) {
                    console.log(`executing ${schema} ${type} ${key}...`);
                    await func({
                        schema: DATABASE_SCHEMA,
                    });
                }
            }
            resolve();
        });
    };

    //public
    const migrationUp = async () => {
        return new Promise(async resolve => {
            await execFileSql(DATABASE_SCHEMA, 'schema');

            //cria as estruturas necessarias no db (schema)
            await execFileSql(DATABASE_SCHEMA, 'table');
            await execFileSql(DATABASE_SCHEMA, 'view');

            console.log(`reload schemas ...`)
            await db.reload();

            resolve();
        });
    };

    try {
        await migrationUp();
        const apiData = await seedApiData(db);
        await showSums(apiData, db);

    } catch (e) {
        console.error(`Something went wrong: ${e.message}`);
    } finally {
        console.log('finally');
    }

    module.exports = { db };
})();
