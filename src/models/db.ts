import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initializeDatabase = async () => {
  const db = await open({ filename: './database.db', driver: sqlite3.Database });

const createTables = async () => {
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
      await db.exec(query);
    }
  };

  await createTables();

  return db;
};

export default initializeDatabase;
