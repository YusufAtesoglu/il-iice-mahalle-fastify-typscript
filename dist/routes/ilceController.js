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
exports.ilceRoutes = void 0;
const ilceService_1 = require("../services/ilceService");
const ilceRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const ilceService = new ilceService_1.IlceService();
    // İlçe eklemek için POST metodu
    fastify.post('/ilceler/import', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const districts = request.body; // Postman'dan gelen JSON verisi
        // JSON verisinin doğru formatta olup olmadığını kontrol et
        if (!Array.isArray(districts)) {
            return reply.status(400).send({ error: 'Geçersiz veri formatı. Lütfen bir dizi gönderin.' });
        }
        try {
            yield ilceService.addDistricts(districts);
            reply.status(201).send({ message: 'İlçeler eklendi.' });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'İlçeler eklenirken hata oluştu.' });
        }
    }));
    // Tüm ilçeleri listelemek için GET metodu
    fastify.get('/ilceler', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const districts = yield ilceService.getAllDistricts();
            reply.send(districts);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Veri alınırken hata oluştu.' });
        }
    }));
});
exports.ilceRoutes = ilceRoutes;
