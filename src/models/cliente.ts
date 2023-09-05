import { Database } from 'sqlite';

export class ClienteModel {
  constructor(private db: Database) {}

  async createCliente(email: string, nombre: string, apellido: string) {
    const query = `INSERT INTO clientes (email, nombre, apellido) VALUES (?, ?, ?)`;
    const result = await this.db.run(query, email, nombre, apellido);
    return result.lastID;
  }
}
