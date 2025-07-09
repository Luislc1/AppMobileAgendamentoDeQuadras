const ReservaModel = require('../models/reservaModel');

const ReservaController = {
  async criar(req, res) {
    try {
      const { id_quadra, id_usuario, data, horario } = req.body;

      if (!id_quadra || !id_usuario || !data || !horario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const novaReserva = await ReservaModel.criarReserva({ id_quadra, id_usuario, data, horario });
      res.status(201).json(novaReserva);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listar(req, res) {
    try {
      const reservas = await ReservaModel.listarReservas();
      res.json(reservas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listarPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const reservas = await ReservaModel.listarReservasPorUsuarios(id_usuario);
      res.json(reservas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async atualizar (req, res) {
    try {
      const { id } = req.params;
      const { id_quadra, id_usuario, data, horario } = req.body;

      if (!id_quadra ||!id_usuario ||!data ||!horario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;
      const reservaExcluida = await ReservaModel.excluirReservas(id);
      if (!reservaExcluida) {
        return res.status(404).json({ error: 'Reserva não encontrada.' });
      }
      res.status(200).json(reservaExcluida);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ReservaController;
