const pool = require('../config/db');

const QuadraModel = {
    async criarQuadra({ nome, localizacao, horarioInicio, horarioFim, id_usuario, disponibilidade, calendario, descricao, horariosDisponiveis }) {
        const result = await pool.query(
            `INSERT INTO quadras (
            nome, localizacao, horarioInicio, horarioFim, id_usuario,
            disponibilidade, calendario, descricao, horariosDisponiveis
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
            [nome, localizacao, horarioInicio, horarioFim, id_usuario, disponibilidade, calendario, descricao, horariosDisponiveis]
        );
        return result.rows[0];
    },


    async listarQuadraPorID(id) {
        const result = await pool.query(
            'SELECT id, nome, localizacao, horarioInicio, horarioFim, disponibilidade, calendario, descricao, horariosDisponiveis FROM quadras WHERE id = $1',
            [id]
        );
        return result.rows[0];
    },

    async listarQuadras() {
        const result = await pool.query('SELECT * FROM quadras');
        return result.rows;
    },

    async atualizarQuadra(id, { nome, localizacao, horarioInicio, horarioFim, disponibilidade, calendario, descricao, horariosDisponiveis }) {
        const result = await pool.query(
            `UPDATE quadras
            SET nome = $1, localizacao = $2, horarioInicio = $3, horarioFim = $4, disponibilidade = $5, calendario = $6, descricao = $7, horariosDisponiveis = $8
            WHERE id = $9
            RETURNING *`,
            [nome, localizacao, horarioInicio, horarioFim, disponibilidade, calendario, descricao, horariosDisponiveis, id]
        )
        return result.rows[0];
    },

    async excluirQuadra(id) {
        const result = await pool.query(
            'DELETE FROM quadras WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
};

module.exports = QuadraModel;