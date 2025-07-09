const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reservaController');

router.post('/', ReservaController.criar);
router.get('/', ReservaController.listar);
router.get('/usuario/:id_usuario', ReservaController.listarPorUsuario);
router.delete('/:id', ReservaController.excluir);

module.exports = router;
