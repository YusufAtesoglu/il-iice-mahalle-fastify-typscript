// src/routes/ilController.ts
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { IlService } from '../services/ilService';
import fs from 'fs';
import path from 'path';

export const ilRoutes: FastifyPluginCallback = async (fastify: FastifyInstance) => {
    const ilService = new IlService();

    // JSON dosyasını okuyup veritabanına eklemek için yeni bir rota
    fastify.post('/iller/import', async (request, reply) => {
        // Postman'dan gelen JSON verisi
        const cities = request.body;
    
        // JSON verisinin doğru formatta olup olmadığını kontrol et
        if (!Array.isArray(cities)) {
            return reply.status(400).send({ error: 'Geçersiz veri formatı. Lütfen bir dizi gönderin.' });
        }
    
        try {
            // Şehirleri veritabanına ekle
            await ilService.addCities(cities);
            reply.status(201).send({ message: 'Şehirler eklendi.' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Şehirler eklenirken hata oluştu.' });
        }
    });
    

    // Şehir eklemek için POST metodu
    fastify.post('/iller', async (request, reply) => {
        const { name } = request.body as { name: string };
        try {
            await ilService.addCity(name);
            reply.status(201).send({ message: 'Şehir eklendi.' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Şehir eklenirken hata oluştu.' });
        }
    });

    // Şehirleri listelemek için GET metodu
    fastify.get('/iller', async (request, reply) => {
        try {
            const cities = await ilService.getAllCities();
            reply.send(cities);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Veri alınırken hata oluştu.' });
        }
    });
};
