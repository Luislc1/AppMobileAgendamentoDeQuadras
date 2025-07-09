const express = require('express');
const router = express.Router();
const QuadraModel = require('../models/quadraModel');

router.post('/', QuadraModel.criarQuadra);
router.get('/', QuadraModel.listarQuadras);
router.get('/:id', QuadraModel.listarQuadraPorID);
router.put('/:id', QuadraModel.atualizarQuadra);
router.delete('/:id', QuadraModel.excluirQuadra);

module.exports = router;