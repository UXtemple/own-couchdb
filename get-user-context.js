import fetchAuth from 'fetch-auth-node';

export default async function getUserContext(req, res, next) {
  const { endpoint } = req.own;

  try {
    const { userCtx } = await fetchAuth(`${endpoint}/_session`, req.headers.authorization);
    req.own.userCtx = userCtx;
    next();
  } catch(err) {
    console.error(err);
    res.statusCode = 401;
    res.end();
  }
}
