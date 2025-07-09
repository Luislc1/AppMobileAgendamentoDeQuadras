const express = require('express');
const router = express.Router();
const administradorController = require('../models/administradorModel');


router.post('/', administradorController.criarAdministrador);
router.get('/', administradorController.listarTodosAdministradores);
router.get('/:id', administradorController.listarAdministradorPorID);
router.put('/:id', administradorController.atualizarAdministrador);
router.delete('/:id', administradorController.excluirAdministrador);

module.exports = router;
