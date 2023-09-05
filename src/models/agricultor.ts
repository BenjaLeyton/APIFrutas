import { Database } from 'sqlite';

export class AgricultorModel {
  constructor(private db: Database) {}

  async createAgricultor(email: string, nombre: string, apellido: string) {
    const query = `INSERT INTO agricultores (email, nombre, apellido) VALUES (?, ?, ?)`;
    const result = await this.db.run(query, email, nombre, apellido);
    return result.lastID;
  }
}
