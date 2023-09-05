import { Database } from 'sqlite';

export class FrutaModel {
  constructor(private db: Database) {}

  async createFruta(nombre: string) {
    const query = `INSERT INTO frutas (nombre) VALUES (?)`;
    const result = await this.db.run(query, nombre);
    return result.lastID;
  }

  async createVariedad(nombre: string, fruta_id: number) {
    const query = `INSERT INTO variedades (nombre, fruta_id) VALUES (?, ?)`;
    const result = await this.db.run(query, nombre, fruta_id);
    return result.lastID;
  }
}
