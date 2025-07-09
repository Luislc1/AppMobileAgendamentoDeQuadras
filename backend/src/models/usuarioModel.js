const { pool } = require('../config/db');

const UsuarioModel = {
  async criarUsuario({ nome, senha, email, cpf }) {  // Singular para criar
    try {
      const result = await pool.query(
        `INSERT INTO usuarios (nome, senha, email, cpf)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nome, email, cpf`,  // Não retornar senha
        [nome, senha, email, cpf]
      );
      return result.rows[0];
    } catch (err) {
      if (err.code === '23505') {  // Violação de unique constraint
        throw new Error('Email ou CPF já cadastrado');
      }
      throw err;
    }
  },

  async listarUsuarios() {
    const result = await pool.query(
      'SELECT id, nome, email, cpf FROM usuarios'
    );
    return result.rows;
  },

  async buscarUsuarioPorId(id) {  // Nome mais descritivo
    const result = await pool.query(
      'SELECT id, nome, email, cpf FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;  // Retorna null se não encontrar
  },

  async atualizarUsuario(id, { nome, senha, email, cpf }) {
    const result = await pool.query(
      `UPDATE usuarios
       SET nome = $1, senha = $2, email = $3, cpf = $4
       WHERE id = $5
       RETURNING id, nome, email, cpf`,  // Não retornar senha
      [nome, senha, email, cpf, id]
    );
    return result.rows[0];
  },

  async excluirUsuario(id) {  // Nome mais descritivo
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = UsuarioModel;