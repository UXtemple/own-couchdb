import { readFileSync } from 'fs';
import invariant from 'invariant';

export default function getServerConfig() {
  const {
    auth,
    db = 'own',
    endpoint = 'http://127.0.0.1:5984',
    port = 5986
  } = JSON.parse(readFileSync(process.env.CONFIG || 'config.json', 'utf8'));

  invariant(auth, 'missing couchdb auth header that can write to the own db');
  invariant(endpoint, `missing couchdb endpoint's own db`);
  invariant(endpoint, 'missing couchdb endpoint');
  invariant(port, 'missing port');

  return {
    auth,
    db,
    endpoint,
    port
  };
}
