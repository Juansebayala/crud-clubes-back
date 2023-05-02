const app = require('./app');

async function main() {
  const PUERTO = process.env.PORT || 8080;
  await app.listen(PUERTO);
  console.log(`Escuchando en http://localhost:${PUERTO}`);
}

main();
