const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Validações básicas
const validarUsuario = [
  check('nome').notEmpty().withMessage('Nome é obrigatório'),
  check('email').isEmail().withMessage('Email inválido'),
  check('cpf').isLength({ min: 11, max: 14 }).withMessage('CPF inválido'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
];

router.post('/', validarUsuario, usuarioController.criar);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);
router.put('/:id', validarUsuario, usuarioController.atualizar);
router.delete('/:id', usuarioController.excluir);

module.exports = router;