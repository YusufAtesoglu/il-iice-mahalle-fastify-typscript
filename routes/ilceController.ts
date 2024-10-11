// src/routes/ilceController.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { IlceService } from '../services/ilceService';

export const ilceRoutes: FastifyPluginCallback = async (fastify: FastifyInstance) => {
    const ilceService = new IlceService();

    // İlçe eklemek için POST metodu
    fastify.post('/ilceler/import', async (request, reply) => {
        const districts = request.body; // Postman'dan gelen JSON verisi

        // JSON verisinin doğru formatta olup olmadığını kontrol et
        if (!Array.isArray(districts)) {
            return reply.status(400).send({ error: 'Geçersiz veri formatı. Lütfen bir dizi gönderin.' });
        }

        try {
            await ilceService.addDistricts(districts);
            reply.status(201).send({ message: 'İlçeler eklendi.' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'İlçeler eklenirken hata oluştu.' });
        }
    });

    // Tüm ilçeleri listelemek için GET metodu
    fastify.get('/ilceler', async (request, reply) => {
        try {
            const districts = await ilceService.getAllDistricts();
            reply.send(districts);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Veri alınırken hata oluştu.' });
        }
    });
};
