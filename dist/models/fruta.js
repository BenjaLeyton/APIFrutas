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
exports.FrutaModel = void 0;
class FrutaModel {
    constructor(db) {
        this.db = db;
    }
    createFruta(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO frutas (nombre) VALUES (?)`;
            const result = yield this.db.run(query, nombre);
            return result.lastID;
        });
    }
    createVariedad(nombre, fruta_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO variedades (nombre, fruta_id) VALUES (?, ?)`;
            const result = yield this.db.run(query, nombre, fruta_id);
            return result.lastID;
        });
    }
}
exports.FrutaModel = FrutaModel;
