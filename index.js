import finalhandler from 'finalhandler';
import getServerConfig from './get-server-config';
import http from 'http';
import router from './router';

const { auth, db, endpoint, port } = getServerConfig();

http.createServer((req, res) => {
  req.own = {auth, db, endpoint};
  router(req, res, finalhandler(req, res));
}).listen(port);

console.log(`CouchDB own running on port http://localhost:${port} against ${endpoint}`);
