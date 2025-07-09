const usuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  async criar(req, res) {
    try {
      const { nome, senha, email, cpf } = req.body;

      if (!nome || !senha || !email || !cpf) {
        return res.status(400).json({ 
          error: 'Todos os campos são obrigatórios.',
          campos: { nome, email, cpf }
        });
      }

      const novoUsuario = await usuarioModel.criarUsuario({ nome, senha, email, cpf });
      res.status(201).json(novoUsuario);
    } catch (err) {
      res.status(400).json({ 
        error: err.message,
        detalhes: err.stack
      });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.listarUsuarios();
      res.json(usuarios.length ? usuarios : { message: 'Nenhum usuário cadastrado' });
    } catch (err) {
      res.status(500).json({ 
        error: 'Erro ao listar usuários',
        detalhes: err.message
      });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await usuarioModel.buscarUsuarioPorId(req.params.id);
      usuario 
        ? res.json(usuario)
        : res.status(404).json({ error: 'Usuário não encontrado' });
    } catch (err) {
      res.status(500).json({ 
        error: 'Erro ao buscar usuário',
        detalhes: err.message
      });
    }
  },

  async atualizar(req, res) {
    try {
      const usuarioAtualizado = await usuarioModel.atualizarUsuario(
        req.params.id,
        req.body
      );
      res.json(usuarioAtualizado);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        detalhes: err.stack
      });
    }
  },

  async excluir(req, res) {
    try {
      const resultado = await usuarioModel.excluirUsuario(req.params.id);
      resultado
        ? res.json({ message: 'Usuário excluído com sucesso', id: resultado.id })
        : res.status(404).json({ error: 'Usuário não encontrado' });
    } catch (err) {
      res.status(500).json({
        error: 'Erro ao excluir usuário',
        detalhes: err.message
      });
    }
  }
};

module.exports = UsuarioController;