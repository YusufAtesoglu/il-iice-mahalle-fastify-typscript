"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IlService = void 0;
const database_1 = __importDefault(require("../database"));
class IlService {
    addCity(name) {
        return new Promise((resolve, reject) => {
            database_1.default.run('INSERT INTO il (sehir_adi) VALUES (?)', [name], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    addCities(cities) {
        const promises = cities.map(city => this.addCity(city.sehir_adi));
        return Promise.all(promises);
    }
    getAllCities() {
        return new Promise((resolve, reject) => {
            database_1.default.all('SELECT * FROM il', [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
exports.IlService = IlService;
