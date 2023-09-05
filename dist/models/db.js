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
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({ filename: './database.db', driver: sqlite3_1.default.Database });
    const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
        const queries = [
            `CREATE TABLE IF NOT EXISTS agricultores (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        nombre TEXT,
        apellido TEXT
      )`,
            `CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        nombre TEXT,
        apellido TEXT
      )`,
            `CREATE TABLE IF NOT EXISTS campos (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        ubicacion TEXT,
        UNIQUE (nombre, ubicacion)
      )`,
            `CREATE TABLE IF NOT EXISTS frutas (
        id INTEGER PRIMARY KEY,
        nombre TEXT UNIQUE
      )`,
            `CREATE TABLE IF NOT EXISTS variedades (
        id INTEGER PRIMARY KEY,
        fruta_id INTEGER,
        nombre TEXT UNIQUE,
        FOREIGN KEY (fruta_id) REFERENCES frutas(id),
        UNIQUE(fruta_id, nombre)
      )`,
            `CREATE TABLE IF NOT EXISTS cosechas (
        id INTEGER PRIMARY KEY,
        campo_id INTEGER,
        variedad_id INTEGER,
        agricultor_id INTEGER,
        cliente_id INTEGER,
        FOREIGN KEY (campo_id) REFERENCES campos(id),
        FOREIGN KEY (variedad_id) REFERENCES variedades(id),
        FOREIGN KEY (agricultor_id) REFERENCES agricultores(id),
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )`,
        ];
        for (const query of queries) {
            yield db.exec(query);
        }
    });
    yield createTables();
    return db;
});
exports.default = initializeDatabase;
