const authValidate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'token not found' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'invalid token' });
  }

  return next();
};

module.exports = authValidate;