"use strict";
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
exports.IlceService = void 0;
// src/services/ilceService.ts
const database_1 = __importDefault(require("../database")); // Veritabanı bağlantınızı doğru şekilde ayarlayın
class IlceService {
    // İlçeleri veritabanına ekleme metodu
    addDistricts(districts) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const stmt = database_1.default.prepare("INSERT INTO ilce (ilce_id, ilce_adi, sehir_id, sehir_adi) VALUES (?, ?, ?, ?)");
                districts.forEach(district => {
                    stmt.run(district.ilce_id, district.ilce_adi, district.sehir_id, district.sehir_adi, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                stmt.finalize((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    // Tüm ilçeleri listeleme metodu
    getAllDistricts() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.all("SELECT * FROM ilce", [], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
}
exports.IlceService = IlceService;
