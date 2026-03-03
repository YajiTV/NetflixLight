function authRequired(req, res, next) {
  // TODO: implement JWT/session validation.
  return res.status(501).json({ error: 'Auth middleware not implemented yet' });
}

module.exports = { authRequired };
