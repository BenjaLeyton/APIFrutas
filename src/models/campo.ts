import { Database } from 'sqlite';

export class CampoModel {
  constructor(private db: Database) {}

  async createCampo(nombre: string, ubicacion: string) {
    const query = `INSERT INTO campos (nombre, ubicacion) VALUES (?, ?)`;
    const result = await this.db.run(query, nombre, ubicacion);
    return result.lastID;
  }
}
