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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../models/db"));
const fruta_1 = require("../models/fruta");
const agricultor_1 = require("../models/agricultor");
const cliente_1 = require("../models/cliente");
const campo_1 = require("../models/campo");
const cosecha_1 = require("../models/cosecha");
const validationSchemas_1 = require("../utils/validationSchemas");
const errorHandler_1 = require("../utils/errorHandler");
const csv_parser_1 = __importDefault(require("csv-parser"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const stream_1 = require("stream");
const router = express_1.default.Router();
router.use((0, express_fileupload_1.default)());
let db;
let agricultorModel;
let clienteModel;
let campoModel;
let frutaModel;
let cosechaModel;
(0, db_1.default)()
    .then(database => {
    db = database;
    agricultorModel = new agricultor_1.AgricultorModel(db);
    clienteModel = new cliente_1.ClienteModel(db);
    campoModel = new campo_1.CampoModel(db);
    frutaModel = new fruta_1.FrutaModel(db);
    cosechaModel = new cosecha_1.CosechaModel(db);
})
    .catch(error => {
    console.error('Failed to connect to the database:', error);
});
router.post('/upload-csv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const csvFile = req.files.csv;
    const results = [];
    const stream = new stream_1.Readable({
        read() {
            this.push(csvFile.data);
            this.push(null);
        }
    });
    stream.pipe((0, csv_parser_1.default)({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        const errors = [];
        for (const result of results) {
            try {
                const agricultorId = yield agricultorModel.createAgricultor(result['Mail Agricultor'], result['Nombre Agricultor'], result['Apellido Agricultor']);
                const clienteId = yield clienteModel.createCliente(result['Mail Cliente'], result['Nombre Cliente'], result['Apellido Cliente']);
                const campoId = yield campoModel.createCampo(result['Nombre Campo'], result['Ubicación de Campo']);
                const frutaId = yield frutaModel.createFruta(result['Fruta Cosechada']);
                const variedadId = yield frutaModel.createVariedad(result['Variedad Cosechada'], frutaId);
                yield cosechaModel.createCosecha(campoId, variedadId, agricultorId, clienteId);
            }
            catch (error) {
                errors.push({ row: result, error: error.message });
            }
        }
        if (errors.length > 0) {
            res.status(400).send({ message: 'Se encontraron errores durante la importación', errors });
        }
        else {
            res.send('File uploaded and data imported successfully.');
        }
    }));
}));
router.post('/agricultor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.agricultorSchema.validate(req.body);
        const agricultor = yield agricultorModel.createAgricultor(validatedData.email, validatedData.nombre, validatedData.apellido);
        res.json(agricultor);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
router.post('/cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.clienteSchema.validate(req.body);
        const cliente = yield clienteModel.createCliente(validatedData.email, validatedData.nombre, validatedData.apellido);
        res.json(cliente);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
router.post('/campo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.campoSchema.validate(req.body);
        const campo = yield campoModel.createCampo(validatedData.nombre, validatedData.ubicacion);
        res.json(campo);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
router.post('/fruta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.frutaSchema.validate(req.body);
        const fruta = yield frutaModel.createFruta(validatedData.nombre);
        res.json(fruta);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
router.post('/variedad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.variedadSchema.validate(req.body);
        const variedad = yield frutaModel.createVariedad(validatedData.nombre, validatedData.fruta_id);
        res.json(variedad);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
router.post('/cosecha', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield validationSchemas_1.cosechaSchema.validate(req.body);
        const cosecha = yield cosechaModel.createCosecha(validatedData.campo_id, validatedData.variedad_id, validatedData.agricultor_id, validatedData.cliente_id);
        res.json(cosecha);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(new errorHandler_1.ErrorHandler(400, error.message), res);
    }
}));
exports.default = router;
