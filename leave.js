import { hasRole } from './roles';
import getDb from './get-db';
import renewCode from './renew-code';

export default async function leave(req, res) {
  const { acl, auth, endpoint, userCtx } = req.own;
  const { app, email } = req.params;
  const usersDb = getDb(endpoint, '_users', auth);

  try {
    if (isAdmin(userCtx) || isOwner(userCtx, acl.doc)) {
      const user = await usersDb.get(`org.couchdb.user:${email}`);

      if (hasRole(user, app)) {
        await usersDb.put({
          ...user,
          roles: user.roles.filter(r => r !== app)
        });

        await renewCode(req, res);
      }
    } else {
      res.statusCode = 401;
      res.end('{}');
    }
  } catch(err) {
    res.statusCode(500);
    res.end('{}');
  }
}
