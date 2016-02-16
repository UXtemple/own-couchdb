import getDb from './get-db';

const NOT_FOUND = 404;

export default async function getAcl(req, res, next) {
  const { app } = req.params;
  const { own } = req;
  const db = getDb(own.endpoint, own.db, own.auth);

  let doc;
  try {
    doc = await db.get(app);
  } catch(err) {
    if (err.status !== NOT_FOUND) {
      res.statusCode = 401;
      return res.end();
    }
  }

  req.own.acl = {
    db,
    doc
  };
  next();
}
