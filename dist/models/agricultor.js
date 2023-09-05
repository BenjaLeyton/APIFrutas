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
exports.AgricultorModel = void 0;
class AgricultorModel {
    constructor(db) {
        this.db = db;
    }
    createAgricultor(email, nombre, apellido) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO agricultores (email, nombre, apellido) VALUES (?, ?, ?)`;
            const result = yield this.db.run(query, email, nombre, apellido);
            return result.lastID;
        });
    }
}
exports.AgricultorModel = AgricultorModel;
