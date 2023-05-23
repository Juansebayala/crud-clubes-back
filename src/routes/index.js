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
const URLFront = 'http://localhost:5173/';

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
  });
  res.end(equipos);
});

router.get('/equipo/:tlaEquipo', (req, res) => {
  res.set({
    'content-type': 'application/json',
  });
  const equipoSolicitado = req.params.tlaEquipo;
  const equipo = buscarEquipo(equipoSolicitado);
  const stringEquipo = JSON.stringify(equipo);
  res.end(stringEquipo);
});

router.post('/equipo/crear-equipo', upload.single('imagen'), (req, res) => {
  try {
    const datosRecibidos = req.body;
    const imagenSubida = req.file;
    crearEquipo(datosRecibidos, imagenSubida);
    res.status(200).json({ exito: true });
  } catch (error) {
    console.error('Error creando equipo:', error.message);
    res.status(500).json({ exito: false });
  }
});

router.put('/equipo/:tlaEquipo/editar', upload.single('imagen'), (req, res) => {
  res.set({
    'content-type': 'application/json',
  });
  try {
    const tlaEquipo = req.params.tlaEquipo;
    const datosRecibidos = req.body;
    const imagenSubida = req.file;
    console.log(datosRecibidos);
    editarEquipo(tlaEquipo, datosRecibidos, imagenSubida);
    res.status(200).json({ exito: true });
  } catch (error) {
    console.error('Error creando equipo:', error.message);
    res.status(500).json({ exito: false });
  }
});

router.delete('/equipo/:tlaEquipo/eliminar', (req, res) => {
  try {
    const tlaEquipo = req.params.tlaEquipo;
    const equipo = buscarEquipo(tlaEquipo);
    const imagenEquipo = equipo.crestUrl.split('imagenes/')[1];
    eliminarEquipo(tlaEquipo, imagenEquipo);
    res.status(200).json({ exito: true });
  } catch (e) {
    console.error('Error creando equipo:', error.message);
    res.status(500).json({ exito: false });
  }
});

module.exports = router;
