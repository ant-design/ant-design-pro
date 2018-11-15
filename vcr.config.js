module.exports = {
  apiMatch: ['http://localhost:8000/api/*'],
  server: {
    command: 'PORT=8001 BROWSER=none MOCK=none npm start',
    port: 8001,
    launchTimeout: 40000,
    debug: true,
  },
};
