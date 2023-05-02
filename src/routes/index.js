const { Router } = require('express');
const router = Router();
const fs = require('fs');
const multer = require('multer');
const buscarEquipo = require('../utilidades/buscar-data');
const {
  crearEquipo,
  eliminarEquipo,
  editarEquipo,
} = require('../utilidades/modificar-data');

const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/imagenes');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/equipos', (req, res) => {
  res.set({
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  });
  res.end(equipos);
});

router.get('/equipo/:tlaEquipo', (req, res) => {
  res.set({
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  });
  const equipoSolicitado = req.params.tlaEquipo;
  const equipo = buscarEquipo(equipoSolicitado);
  const stringEquipo = JSON.stringify(equipo);
  res.end(stringEquipo);
});

router.post('/equipo/crear-equipo', upload.single('imagen'), (req, res) => {
  const datosRecibidos = req.body;
  const imagenSubida = req.file;
  crearEquipo(datosRecibidos, imagenSubida);
  res.redirect('http://localhost:5173/equipo/crear-equipo/creado');
});

router.put('/equipo/:tlaEquipo/editar', upload.single('imagen'), (req, res) => {
  res.set({
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  });
  const tlaEquipo = req.params.tlaEquipo;
  const datosRecibidos = req.body;
  const imagenSubida = req.file;
  editarEquipo(tlaEquipo, datosRecibidos, imagenSubida);
  const datosEquipo = buscarEquipo(tlaEquipo);
  const stringEquipo = JSON.stringify(datosEquipo);
  res.end(stringEquipo);
});

module.exports = router;
