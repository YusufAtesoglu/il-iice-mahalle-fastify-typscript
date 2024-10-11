"use strict";
// services/mahalleService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class MahalleService {
    addMahalleler(mahalleler) {
        return __awaiter(this, void 0, void 0, function* () {
            const stmt = database_1.default.prepare("INSERT INTO mahalle (mahalle_id, mahalle_adi, ilce_id, ilce_adi, sehir_id, sehir_adi) VALUES (?, ?, ?, ?, ?, ?)");
            mahalleler.forEach(mahalle => {
                stmt.run(mahalle.mahalle_id, mahalle.mahalle_adi, mahalle.ilce_id, mahalle.ilce_adi, mahalle.sehir_id, mahalle.sehir_adi, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            });
            stmt.finalize();
        });
    }
    getMahalleler() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.all('SELECT * FROM mahalle', (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
            });
        });
    }
}
exports.default = new MahalleService();
