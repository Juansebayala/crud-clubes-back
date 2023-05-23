const fs = require('fs');

function buscarEquipo(tlaEquipo) {
  const equipos = fs.readFileSync('./data/equipos.json', 'utf-8');
  const json_equipos = JSON.parse(equipos);
  let datos;
  json_equipos.forEach((equipo) => {
    if (equipo.tla == tlaEquipo) {
      datos = require(`../data/equipos/${equipo.tla}.json`);
    }
  });
  return datos;
}

module.exports = buscarEquipo;
