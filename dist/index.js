"use strict";
// index.ts
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
const fastify_1 = __importDefault(require("fastify"));
const ilController_1 = require("./routes/ilController");
const ilceController_1 = require("./routes/ilceController");
const mahalleController_1 = require("./routes/mahalleController"); // Mahalle rotasını import edin
const database_1 = __importDefault(require("./database"));
const app = (0, fastify_1.default)();
// Veritabanında il tablosunu oluşturun
database_1.default.serialize(() => {
    database_1.default.run(`
        CREATE TABLE IF NOT EXISTS il (
            sehir_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sehir_adi TEXT NOT NULL
        )
    `);
    // Veritabanında ilce tablosunu oluşturun
    database_1.default.run(`
        CREATE TABLE IF NOT EXISTS ilce (
            ilce_id INTEGER PRIMARY KEY,
            ilce_adi TEXT NOT NULL,
            sehir_id INTEGER,
            sehir_adi TEXT,
            FOREIGN KEY (sehir_id) REFERENCES il(sehir_id)
        )
    `);
    // Veritabanında mahalle tablosunu oluşturun
    database_1.default.run(`
        CREATE TABLE IF NOT EXISTS mahalle (
            mahalle_id INTEGER PRIMARY KEY,
            mahalle_adi TEXT NOT NULL,
            ilce_id INTEGER,
            ilce_adi TEXT,
            sehir_id INTEGER,
            sehir_adi TEXT,
            FOREIGN KEY (ilce_id) REFERENCES ilce(ilce_id)
        )
    `);
});
// Rotaları kaydet
app.register(ilController_1.ilRoutes);
app.register(ilceController_1.ilceRoutes);
app.register(mahalleController_1.mahalleRoutes); // Mahalle rotalarını kaydedin
// Sunucuyu başlat
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: 8081 });
        console.log('Server is running on http://localhost:8081');
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
// Sunucuyu başlat
start();
