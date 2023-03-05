const execFileSql = async (db, schema, type) => {
    return new Promise(async resolve => {
        const objects = db['user'][type];

        if (objects) {
            for (const [key, func] of Object.entries(objects)) {
                console.log(`executing ${schema} ${type} ${key}...`);
                await func({
                    schema: schema,
                });
            }
        }
        resolve();
    });
};

//public
const migrationUp = async (db, schema) => {
    return new Promise(async resolve => {
        await execFileSql(db, schema, 'schema');

        //cria as estruturas necessarias no db (schema)
        await execFileSql(db, schema, 'table');
        await execFileSql(db, schema, 'view');

        console.log(`reload schemas ...`)
        await db.reload();

        resolve();
    });
};

module.exports = {
    migrationUp,
}
