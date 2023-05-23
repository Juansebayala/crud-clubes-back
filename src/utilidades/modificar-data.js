const fs = require('fs');
const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');
const json_equipos = JSON.parse(equipos);

function obtenerDatosEquipo(tlaEquipo) {
  for (let i = 0; i < json_equipos.length; i++) {
    if (tlaEquipo == json_equipos[i].tla) {
      return i;
    }
  }
}

function crearEquipo(datosEquipo, imagenEquipo) {
  const tlaEquipo = datosEquipo.nombre.substring(0, 3).toUpperCase();
  const nuevoEquipo = {
    id: datosEquipo.nombre,
    name: datosEquipo.nombre,
    area: {
      name: datosEquipo.pais,
    },
    tla: tlaEquipo,
    crestUrl: `http://localhost:3000/static/imagenes/${imagenEquipo.originalname}`,
    address: datosEquipo.direccion,
    founded: datosEquipo.fundacion,
    venue: datosEquipo.estadio,
  };
  json_equipos.push(nuevoEquipo);
  const equiposActualizados = JSON.stringify(json_equipos);
  const equipoAgregado = JSON.stringify(nuevoEquipo);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.writeFileSync(`./data/equipos/${tlaEquipo}.json`, equipoAgregado, 'utf-8');
}

function editarEquipo(tlaEquipo, datosEquipo, imagenEquipo) {
  const posicionEquipo = obtenerDatosEquipo(tlaEquipo);
  const nuevosDatos = {
    id: datosEquipo.nombre,
    name: datosEquipo.nombre,
    area: {
      name: datosEquipo.pais,
    },
    tla: tlaEquipo,
    crestUrl: `http://localhost:3000/static/imagenes/${imagenEquipo.originalname}`,
    address: datosEquipo.direccion,
    founded: datosEquipo.fundacion,
    venue: datosEquipo.estadio,
  };
  json_equipos.splice(posicionEquipo, 1, nuevosDatos);
  const equiposActualizados = JSON.stringify(json_equipos);
  const equipoActualizado = JSON.stringify(nuevosDatos);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.writeFileSync(
    `./data/equipos/${tlaEquipo}.json`,
    equipoActualizado,
    'utf-8'
  );
}

function eliminarEquipo(tlaEquipo, imagenEquipo) {
  const indiceEquipo = obtenerDatosEquipo(tlaEquipo);
  json_equipos.splice(indiceEquipo, 1);
  const equiposActualizados = JSON.stringify(json_equipos);
  fs.writeFileSync('./data/equipos.json', equiposActualizados, 'utf-8');
  fs.unlinkSync(`./data/equipos/${tlaEquipo}.json`);
  fs.unlinkSync(`./uploads/imagenes/${imagenEquipo}`);
}

exports.crearEquipo = crearEquipo;
exports.editarEquipo = editarEquipo;
exports.eliminarEquipo = eliminarEquipo;
