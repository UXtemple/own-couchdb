import getAcl from './get-acl';
import getCode from './get-code';
import getUserContext from './get-user-context';
import join from './join';
import leave from './leave';
import own from './own';
import renewCode from './renew-code';
import Router from 'router';

const router = Router();
router.use(getUserContext);
router.route('/:app')
  .all(getAcl)
  .get(getCode)
  .post(own)
  .purge(renewCode);

router.route('/:app/:code')
  .all(getAcl)
  .put(join);

router.route('/:app/:email')
  .all(getAcl)
  .delete(leave);

export default router;
