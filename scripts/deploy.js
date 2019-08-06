const Client = require('ssh2').Client;
const { join } = require('path');

const conn = new Client();

const deployPath = '/var/mxcins.com/frontend';

const scripts = `
cd ${deployPath}/git/
git checkout master
git pull
yarn
yarn build
cp -R ${deployPath}/git/dist/* ${deployPath}/current
exit
`;


conn.on('ready', () => {
  console.log('Client :: ready');
  conn.shell((err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Stream :: close');
      conn.end();
    }).on('data', (data) => {
      console.log('OUTPUT: ' + data);
    });
    // stream.end('ls -l\nexit\n');
    stream.end(scripts);
  });
}).connect({
  host: '47.94.145.118',
  port: 22,
  username: 'root',
  privateKey: require('fs').readFileSync(join(process.env['HOME'], '/.ssh/id_rsa')),
});

