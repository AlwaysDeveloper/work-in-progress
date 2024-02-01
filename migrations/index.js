import FileSystem from 'fs';
import path from 'path';
import db from '../models/db.js';

export default async function migrations () {
    const migrationFiles = FileSystem
        .readdirSync(__dirname).filter(file => file !== 'index.js');

    const migrationOptions = process.argv.slice(1).reduce((options, args) => {
        if(!options.action && ['up', 'down'].includes(args)) {
            options.action = args;
        }
        if(args === 'all') {
            options.all = true;
        }
        if(migrationFiles.includes(args)) {
            options.run.push(args);
        }
        return options;
    }, { action, all: false, run: [] });
    
    const { sequelize, Sequelize } = db;

    const { action, all, run } = migrationOptions;
    
    const finalFiles = (run.length > 0 && !all) ? run : migrationFiles; 

    for(let i = 0; i < finalFiles.length; i++) {
        const file = finalFiles[i];
        try {
            const migration = require(path.resolve(__dirname, file));
            await migration[action](sequelize.getQueryInterface(), Sequelize);
            console.log(`migration ${file} is ${action} successfully.`)
        } catch (error) {
            console.log(`migration ${file} is ${action} failed.`);
            console.error(error);
            process.exit(0);
        }
    } 
}


migrations();