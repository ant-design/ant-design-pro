/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable eslint-comments/no-unlimited-disable */
const { spawn } = require('child_process');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
env.TEST = true;
// flag to prevent multiple test
let once = false;

const startServer = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {
  env,
});

startServer.stderr.on('data', data => {
  // eslint-disable-next-line
  console.log(data.toString());
});

startServer.on('exit', () => {
  kill(process.env.PORT || 8000);
});

console.log('Starting development server for e2e tests...');
startServer.stdout.on('data', data => {
  console.log(data.toString());
  // hack code , wait umi
  if (
    (!once && data.toString().indexOf('Compiled successfully') >= 0) ||
    data.toString().indexOf('Theme generated successfully') >= 0
  ) {
    // eslint-disable-next-line
    once = true;
    console.log('Development server is started, ready to run tests.');
    const testCmd = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['test', '--', '--maxWorkers=1', '--runInBand'],
      {
        stdio: 'inherit',
      },
    );
    testCmd.on('exit', code => {
      startServer.kill();
      process.exit(code);
    });
  }
});
