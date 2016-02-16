import { spy, stub } from 'sinon';
import proxyquire from 'proxyquire';
import test from 'tape';

const invariant = spy();
invariant.withArgs(undefined, 'missing secret');

const readFileSync = stub();
readFileSync.onCall(0).returns('{}');
readFileSync.onCall(1).returns(`{
  "endpoint": "endpoint",
  "port": 3000
}`);

const getServerConfig = proxyquire('../get-server-config', {
  fs: {
    readFileSync
  },
  invariant
}).default;

test('#getServerConfig', t => {
  t.deepEquals(getServerConfig(), {
    endpoint: 'http://127.0.0.1:5984',
    port: 5986
  }, 'defaults');

  t.deepEquals(getServerConfig(), {
    "endpoint": "endpoint",
    "port": 3000
  }, 'overrides');

  t.end();
});
