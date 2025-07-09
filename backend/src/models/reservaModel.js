const pool = require('../config/db');

const ReservaModel = {
  async criarReserva({ id_quadra, id_usuario, data, horario }) {
    const result = await db.query(
      `INSERT INTO reservas (id_quadra, id_usuario, data, horario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_quadra, id_usuario, data, horario]
    );
    return result.rows[0];
  },

  async listarReservas() {
    const result = await db.query('SELECT * FROM reservas');
    return result.rows;
  },

  async listarReservasPorUsuarios(id_usuario) {
    const result = await db.query(
      'SELECT * FROM reservas WHERE id_usuario = $1',
      [id_usuario]
    );
    return result.rows;
  },

  async excluirReservas(id) {
    const result = await db.query(
      'DELETE FROM reservas WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = ReservaModel;
