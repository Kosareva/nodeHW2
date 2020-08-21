const { terminate } = require('./app/utils');
const db = require('./db');
const app = require('./app');
const port = process.env.PORT || 3000;

(async () => {
  await db.connect();
  await db.reset();
  const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

  const exitHandler = terminate(server);

  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  process.on('SIGINT', exitHandler(0, 'SIGINT'));
})();
