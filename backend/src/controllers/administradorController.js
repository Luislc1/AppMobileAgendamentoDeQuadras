const AdministradorModel = require('../models/administradorModel');

const administradorController = {
    async criar(req, res) {
        try {
            const { nome, senha, email, telefone, cpf } = req.body;

            if (!nome || !senha || !email || !telefone || !cpf) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            const administrador = await AdministradorModel.criarAdministradores(nome, senha, email, telefone, cpf);
            res.status(201).json(administrador);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async listar(req, res) {
        try {
            const administradores = await AdministradorModel.visualizarTodosAdministradores();
            res.json(administradores);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, senha, email, telefone, cpf } = req.body;

            if (!nome || !senha || !email || !telefone || !cpf) {
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
            const administradorExcluido = await AdministradorModel.excluirAdministradores(id);
            if (!administradorExcluido) {
                return res.status(404).json({ error: 'Administrador não encontrado.' });
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = administradorController;