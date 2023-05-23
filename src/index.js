const app = require('./app');

async function main() {
  const PUERTO = process.env.PORT || 3000;
  await app.listen(PUERTO);
  console.log(`Escuchando en http://localhost:${PUERTO}`);
}

main();
