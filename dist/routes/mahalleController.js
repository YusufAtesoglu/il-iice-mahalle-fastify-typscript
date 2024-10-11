"use strict";
// routes/mahalleController.ts
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
exports.mahalleRoutes = void 0;
const mahalleService_1 = __importDefault(require("../services/mahalleService"));
const mahalleRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.post('/mahalleler/import', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const mahalleler = request.body; // JSON verilerini al ve türünü belirt
        try {
            yield mahalleService_1.default.addMahalleler(mahalleler);
            reply.status(201).send({ message: 'Mahalleler eklendi.' });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Mahalleler eklenirken hata oluştu.' });
        }
    }));
    app.get('/mahalleler', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mahalleler = yield mahalleService_1.default.getMahalleler();
            reply.status(200).send(mahalleler);
        }
        catch (error) {
            reply.status(500).send({ error: 'Mahalleler getirilirken bir hata oluştu.' });
        }
    }));
});
exports.mahalleRoutes = mahalleRoutes;
