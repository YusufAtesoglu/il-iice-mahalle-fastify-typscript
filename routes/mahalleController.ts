// routes/mahalleController.ts

import { FastifyInstance } from 'fastify';
import MahalleService from '../services/mahalleService';

export const mahalleRoutes = async (app: FastifyInstance) => {
    app.post('/mahalleler/import', async (request, reply) => {
        const mahalleler = request.body as Array<{
            mahalle_id: string;
            mahalle_adi: string;
            ilce_id: string;
            ilce_adi: string;
            sehir_id: string;
            sehir_adi: string;
        }>;// JSON verilerini al ve türünü belirt

        try {
            await MahalleService.addMahalleler(mahalleler);
            reply.status(201).send({ message: 'Mahalleler eklendi.' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Mahalleler eklenirken hata oluştu.' });
        }
    });


    app.get('/mahalleler', async (request, reply) => {
        try {
            const mahalleler = await MahalleService.getMahalleler();
            reply.status(200).send(mahalleler);
        } catch (error) {
            reply.status(500).send({ error: 'Mahalleler getirilirken bir hata oluştu.' });
        }
    });

};
