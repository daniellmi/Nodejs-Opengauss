const express = require('express');
const bodyParser = require('body-parser');
const OpenGauss = require('node-opengauss');

const app = express();
const PORT = 8000;
const client = new OpenGauss();

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const config = {
  host: 'localhost',
  port: 26000,
  username: 'omm',
  database: 'cattle',
  password: '1234@qwe'
}

async function connect() {
const {stdout} = await exec('gs_om -t status');

if(stdout.includes('Unavailable')) {
console.log("restarting opengauss");
await exec('gs_om -t start');

}

await client.connect(config);
console.log("connected and configured");

}

try {
connect();
}
catch(error) {
console.log(error);
}

app.post('/data', (req, res) => {
	console.log(req.body);
//client.query(`insert into cows values (1, 36,2)`, result => {
    //console.log(result) 
  //  return client.disconnect()
//})
})



app.listen(PORT, () => {console.log('app is running'); })


