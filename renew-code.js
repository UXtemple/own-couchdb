import { isAdmin, isOwner } from './roles';
import getRandomCode from './get-random-code';

export default async function renewCode(req, res) {
  const { acl, userCtx } = req.own;

  if (typeof acl.doc !== 'undefined') {
    if (isAdmin(userCtx) || isOwner(userCtx, acl.doc)) {
      try {
        const blacklist = [acl.doc.code, ...acl.doc.blacklist];
        const code = getRandomCode(blacklist);

        await acl.db.put({
          ...acl.doc,
          blacklist,
          code
        });

        res.statusCode = 200;
        res.end(code);
      } catch(err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
      }
    } else {
      res.statusCode = 401;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
}
