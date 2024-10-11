"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('./mydatabase.db', (err) => {
    if (db)
        console.log("Veri tabanına bağlandı");
    else {
        console.error('Database opening error: ', err);
    }
});
exports.default = db;
