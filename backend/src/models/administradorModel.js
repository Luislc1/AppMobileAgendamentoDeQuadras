const pool = require('../config/db');

const AdministradorModel = {
  async criarAdministrador({ nome, senha, email, telefone, cpf }) {
    const result = await db.query(
      `INSERT INTO administradores (nome, senha, email, telefone, cpf)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nome, senha, email, telefone, cpf]
    )
    return result.rows[0];
  },

  async listarAdministradorPorID(id) {
    const result = await db.query(
      'SELECT id, nome, senha, email, telefone, cpf FROM administradores WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async listarTodosAdministradores() {
    const result = await db.query(
      'SELECT id, nome, senha, email, telefone, cpf FROM administradores'
    );
    return result.rows;
  },

  async atualizarAdministrador(id, { nome, senha, email, telefone, cpf }) {
    const result = await db.query(
      `UPDATE administradores
       SET nome = $1, senha = $2, email = $3, telefone = $4, cpf = $5
       WHERE id = $6
       RETURNING *`,
      [nome, senha, email, telefone, cpf, id]
    )
    return result.rows[0];
  },

  async excluirAdministrador(id) {
    const result = await db.query(
      'DELETE FROM administradores WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
}

module.exports = AdministradorModel;