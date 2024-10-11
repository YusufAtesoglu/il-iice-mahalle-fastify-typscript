import { Database } from 'sqlite3';

const db = new Database('./mydatabase.db', (err) => {
    if(db) console.log("Veri tabanına bağlandı");
    else  {
        console.error('Database opening error: ', err);
    }
});

export default db;
