// services/mahalleService.ts

import db from '../database';

interface Mahalle {
    mahalle_id: string;
    mahalle_adi: string;
    ilce_id: string;
    ilce_adi: string;
    sehir_id: string;
    sehir_adi: string;
}

class MahalleService {
    async addMahalleler(mahalleler: Mahalle[]): Promise<void> {
        const stmt = db.prepare("INSERT INTO mahalle (mahalle_id, mahalle_adi, ilce_id, ilce_adi, sehir_id, sehir_adi) VALUES (?, ?, ?, ?, ?, ?)");

        mahalleler.forEach(mahalle => {
            stmt.run(mahalle.mahalle_id, mahalle.mahalle_adi, mahalle.ilce_id, mahalle.ilce_adi, mahalle.sehir_id, mahalle.sehir_adi, (err: any) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });

        stmt.finalize();
    }
    async getMahalleler() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM mahalle', (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

}

export default new MahalleService();
