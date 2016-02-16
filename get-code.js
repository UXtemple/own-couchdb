import { isAdmin, isOwner } from './roles';

export default function getCode(req, res) {
  const { acl, userCtx } = req.own;

  if (typeof acl.doc !== 'undefined') {
    if (isAdmin(userCtx) || isOwner(userCtx, acl.doc)) {
      res.statusCode = 200;
      res.end(acl.doc.code);
    } else {
      res.statusCode = 401;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
}
