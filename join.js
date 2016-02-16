import { hasRole } from './roles';
import getDb from './get-db';

export default async function join(req, res) {
  const { app, code } = req.params;
  const { acl, auth, endpoint, userCtx } = req.own;
  const usersDb = getDb(endpoint, '_users', auth);

  try {
    if (acl.doc.code === code.toUpperCase()) {
      const user = await usersDb.get(`org.couchdb.user:${userCtx.name}`);

      if (!hasRole(user, app)) {
        await usersDb.put({
          ...user,
          roles: [...user.roles, app]
        });
      }

      res.statusCode = 200;
      res.end();
    } else {
      res.statusCode = 401;
      res.end();
    }
  } catch(err) {
    res.statusCode = 500;
    res.end();
  }
}
