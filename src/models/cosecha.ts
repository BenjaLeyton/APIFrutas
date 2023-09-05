import { Database } from 'sqlite';

export class CosechaModel {
  constructor(private db: Database) {}

  async createCosecha(campo_id: number, variedad_id: number, agricultor_id: number, cliente_id: number) {
    const query = `INSERT INTO cosechas (campo_id, variedad_id, agricultor_id, cliente_id) VALUES (?, ?, ?, ?)`;
    const result = await this.db.run(query, campo_id, variedad_id, agricultor_id, cliente_id);
    return result.lastID;
  }
}
