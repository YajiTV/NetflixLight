async function register(req, res) {
  res.status(501).json({ error: 'POST /api/auth/register not implemented' });
}

async function login(req, res) {
  res.status(501).json({ error: 'POST /api/auth/login not implemented' });
}

async function me(req, res) {
  res.status(501).json({ error: 'GET /api/auth/me not implemented' });
}

module.exports = { register, login, me };
