import db from "../database";

// Şehir arayüzü tanımı
interface City {
    sehir_id: string;
    sehir_adi: string;
}

export class IlService {
    addCity(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO il (sehir_adi) VALUES (?)', [name], (err: Error | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    addCities(cities: City[]): Promise<void[]> {
        const promises = cities.map(city => this.addCity(city.sehir_adi));
        return Promise.all(promises);
    }

    getAllCities(): Promise<City[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM il', [], (err: Error | null, rows: City[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    
}
