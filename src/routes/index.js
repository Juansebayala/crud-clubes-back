const { Router } = require('express');
const router = Router();
const fs = require('fs');
const buscarEquipo = require('../utilidades/buscar-data');

const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');

router.get('/equipos', (req, res) => {
  res.set('content-type', 'application/json');
  res.end(equipos);
});

router.get('/equipo/:tlaEquipo', (req, res) => {
  res.set('content-type', 'application/json');
  const equipoSolicitado = req.params.tlaEquipo;
  const equipo = buscarEquipo(equipoSolicitado);
  const stringEquipo = JSON.stringify(equipo);
  res.end(stringEquipo);
});

module.exports = router;
