import PouchDB from 'pouchdb';

export default function getDb(endpoint, db, Authorization) {
  return new PouchDB(`${endpoint}/${db}`, {ajax: {headers: {Authorization}}});
}
