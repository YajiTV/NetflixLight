const AuthService = require("../services/auth.service");
const {makeError} = require('../utils/errors');

function validateRegisterInput({ username, email, password }) {
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw makeError(400, "Invalid payload");
  }

  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanUsername || !cleanEmail || !password) {
    throw makeError(400, "Username, email and password are required");
  }

  if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(cleanUsername)) {
    throw makeError(400, "Username must be 3-20 chars (letters, numbers, _.-)");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw makeError(400, "Invalid email format");
  }

  if (password.length < 12 || password.length > 128) {
    throw makeError(400, "Password must be 12-128 chars");
  }

  return { username: cleanUsername, email: cleanEmail, password };
}

function validateLoginInput({ identifier, email, username, password }) {
  const id = (identifier || email || username || "").trim().toLowerCase();

  if (!id || typeof password !== "string") {
    throw makeError(400, "Identifier and password are required");
  }

  if (password.length < 12 || password.length > 128) {
    throw makeError(400, "Password must be 12-128 chars");
  }

  if (!/[A-Z]/.test(password)) {
    throw makeError(400, "Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    throw makeError(400, "Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    throw makeError(400, "Password must contain at least one digit");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    throw makeError(400, "Password must contain at least one special character");
  }

  return { identifier: id, password };
}

async function register(req, res) {
  const payload = validateRegisterInput(req.body);
  const user = await AuthService.register(payload);
  return res.status(201).json({ user });
}

async function login(req, res) {
  const payload = validateLoginInput(req.body);
  const user = await AuthService.login(payload);

  req.session.userId = user.id;

  return res.status(200).json({ user });
}
async function me(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await AuthService.me(req.session.userId);
  return res.status(200).json({ user });
}

async function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); 
    return res.status(200).json({
      message: "Logged out"
    });
  });
}



module.exports = { register, login, me, logout };
