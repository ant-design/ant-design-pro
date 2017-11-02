const { spawn } = require('child_process');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
const startServer = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {
  env,
});

startServer.stderr.on('data', (data) => {
  // eslint-disable-next-line
  console.log(data);
});

startServer.on('exit', () => {
  kill(process.env.PORT || 8000);
});

// eslint-disable-next-line
console.log('Starting development server for e2e tests...');
startServer.stdout.on('data', (data) => {
  // eslint-disable-next-line
  console.log(data.toString());
  if (data.toString().indexOf('The app is running at') >= 0 ||
      data.toString().indexOf('Compiled with warnings') >= 0) {
    // eslint-disable-next-line
    console.log('Development server is started, ready to run tests.');
    const testCmd = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['test'], {
      stdio: 'inherit',
    });
    testCmd.on('exit', () => {
      startServer.kill();
    });
  }
});
