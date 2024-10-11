// src/services/ilceService.ts
import db from '../database'; // Veritabanı bağlantınızı doğru şekilde ayarlayın

interface District {
    ilce_id: string;
    ilce_adi: string;
    sehir_id: string;
    sehir_adi: string;
}

export class IlceService {
    // İlçeleri veritabanına ekleme metodu
    async addDistricts(districts: District[]) {
        return new Promise<void>((resolve, reject) => {
            const stmt = db.prepare("INSERT INTO ilce (ilce_id, ilce_adi, sehir_id, sehir_adi) VALUES (?, ?, ?, ?)");

            districts.forEach(district => {
                stmt.run(district.ilce_id, district.ilce_adi, district.sehir_id, district.sehir_adi, (err: Error | null) => {
                    if (err) {
                        reject(err);
                    }
                });
            });

            stmt.finalize((err: Error | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Tüm ilçeleri listeleme metodu
    async getAllDistricts(): Promise<District[]> {
        return new Promise<District[]>((resolve, reject) => {
            db.all("SELECT * FROM ilce", [], (err: Error | null, rows: District[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
