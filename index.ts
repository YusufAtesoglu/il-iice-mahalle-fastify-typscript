// index.ts

import fastify from 'fastify';
import { ilRoutes } from './routes/ilController';
import { ilceRoutes } from './routes/ilceController';
import { mahalleRoutes } from './routes/mahalleController'; // Mahalle rotasını import edin
import db from './database';

const app = fastify();

// Veritabanında il tablosunu oluşturun
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS il (
            sehir_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sehir_adi TEXT NOT NULL
        )
    `);

    // Veritabanında ilce tablosunu oluşturun
    db.run(`
        CREATE TABLE IF NOT EXISTS ilce (
            ilce_id INTEGER PRIMARY KEY,
            ilce_adi TEXT NOT NULL,
            sehir_id INTEGER,
            sehir_adi TEXT,
            FOREIGN KEY (sehir_id) REFERENCES il(sehir_id)
        )
    `);

    // Veritabanında mahalle tablosunu oluşturun
    db.run(`
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
app.register(ilRoutes);
app.register(ilceRoutes);
app.register(mahalleRoutes); // Mahalle rotalarını kaydedin

// Sunucuyu başlat
const start = async () => {
    try {
        await app.listen({ port: 8081 });
        console.log('Server is running on http://localhost:8081');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

// Sunucuyu başlat
start();
