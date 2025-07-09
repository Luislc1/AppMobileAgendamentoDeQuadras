const QuadraModel = require('../models/quadraModel');

const QuadraController = {
  async criarQuadra(req, res) {
    try {
      const {
        nome,
        localizacao,
        horarioInicio,
        horarioFim,
        id_usuario,
        disponibilidade,
        calendario,
        descricao,
        horariosDisponiveis
      } = req.body;

      if (
        !nome ||
        !localizacao ||
        !horarioInicio ||
        !horarioFim ||
        !id_usuario ||
        disponibilidade === undefined ||
        !calendario ||
        !descricao ||
        !horariosDisponiveis
      ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const novaQuadra = await QuadraModel.criarQuadra(req.body);
      res.status(201).json(novaQuadra);
    } catch (error) {
      console.error('Erro ao criar quadra:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async listarQuadras(req, res) {
    try {
      const quadras = await QuadraModel.listarQuadras();
      res.json(quadras);
    } catch (error) {
      console.error('Erro ao listar quadras:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async listarQuadraPorID(req, res) {
    const { id } = req.params;
    try {
      const quadra = await QuadraModel.listarQuadraPorID(id);
      if (!quadra) {
        return res.status(404).json({ error: 'Quadra não encontrada.' });
      }
      res.json(quadra);
    } catch (error) {
      console.error('Erro ao buscar quadra:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async atualizarQuadra(req, res) {
    const { id } = req.params;
    const {
      nome,
      localizacao,
      horarioInicio,
      horarioFim,
      disponibilidade,
      calendario,
      descricao,
      horariosDisponiveis
    } = req.body;

    try {
      if (
        !nome ||
        !localizacao ||
        !horarioInicio ||
        !horarioFim ||
        disponibilidade === undefined ||
        !calendario ||
        !descricao ||
        !horariosDisponiveis
      ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const quadraAtualizada = await QuadraModel.atualizarQuadra(id, req.body);

      if (!quadraAtualizada) {
        return res.status(404).json({ error: 'Quadra não encontrada.' });
      }

      res.json(quadraAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar quadra:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async excluirQuadra(req, res) {
    const { id } = req.params;
    try {
      const quadraRemovida = await QuadraModel.excluirQuadra(id);

      if (!quadraRemovida) {
        return res.status(404).json({ error: 'Quadra não encontrada.' });
      }

      res.status(200).json({ mensagem: 'Quadra removida com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir quadra:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = QuadraController;
