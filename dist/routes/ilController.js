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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ilRoutes = void 0;
const ilService_1 = require("../services/ilService");
const ilRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const ilService = new ilService_1.IlService();
    // JSON dosyasını okuyup veritabanına eklemek için yeni bir rota
    fastify.post('/iller/import', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        // Postman'dan gelen JSON verisi
        const cities = request.body;
        // JSON verisinin doğru formatta olup olmadığını kontrol et
        if (!Array.isArray(cities)) {
            return reply.status(400).send({ error: 'Geçersiz veri formatı. Lütfen bir dizi gönderin.' });
        }
        try {
            // Şehirleri veritabanına ekle
            yield ilService.addCities(cities);
            reply.status(201).send({ message: 'Şehirler eklendi.' });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Şehirler eklenirken hata oluştu.' });
        }
    }));
    // Şehir eklemek için POST metodu
    fastify.post('/iller', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = request.body;
        try {
            yield ilService.addCity(name);
            reply.status(201).send({ message: 'Şehir eklendi.' });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Şehir eklenirken hata oluştu.' });
        }
    }));
    // Şehirleri listelemek için GET metodu
    fastify.get('/iller', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cities = yield ilService.getAllCities();
            reply.send(cities);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Veri alınırken hata oluştu.' });
        }
    }));
});
exports.ilRoutes = ilRoutes;
