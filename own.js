import join from './join';
import appToDbName from './app-to-db-name';
import createDesignDocForApp from './create-design-doc-for-app';
import getDb from './get-db';
import getRandomCode from './get-random-code';
import renewCode from './renew-code';

export default async function own(req, res) {
  const { acl, auth, endpoint, userCtx } = req.own;
  const { app } = req.params;

  if (typeof acl.doc === 'undefined') {
    try {
      // create a design doc that will only allow users on the group to edit stuff
      await getDb(endpoint, appToDbName(app), auth).put({
        _id: `_design/only-${app}`,
        validate_doc_update: createDesignDocForApp(app)
      });

      // set the admins on the ACL doc
      const code = getRandomCode();
      await acl.db.put({
        _id: app,
        admins: [userCtx.name],
        blacklist: [],
        code
      });
      req.own.acl.doc = await acl.db.get(app);
      req.params.code = code;

      // allow the user to access the app
      await join(req, res);
    } catch(err) {
      console.error('own', err, err.stack);
      res.statusCode = 500;
      res.end('{}');
    }
  } else {
    res.statusCode = 401;
    res.end('{}');
  }
}
