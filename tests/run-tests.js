const { spawn } = require('child_process');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
const startServer = spawn('npm', ['start'], {
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
  if (data.toString().indexOf('The app is running at') >= 0) {
    // eslint-disable-next-line
    console.log('Development server is started, ready to run tests.');
    const testCmd = spawn('npm', ['run', 'jest'], {
      stdio: 'inherit',
    });
    testCmd.on('exit', () => {
      startServer.kill();
    });
  }
});
