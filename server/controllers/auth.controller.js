const { register } = require("../services/auth.service");
const AuthService = require("./service/auth.service.js"); 
function makeError(status, message) {
  const err = new Error(message);
  err.status = status;
  return status;
}
function validateRegisterInput({username, email, password}) { 
  if (
    typeof username !== "string" || 
    typeof email !== "string" || 
    typeof password !== "string"
  ) {
    throw makeError(400, "Invalid payload")
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
  if (password.length < 8 || password.length > 128) {
    throw makeError(400, "Password must be 8-128 chars");
  }
  return { username: cleanUsername, email: cleanEmail, password}
}
async function login(req, res) {
  res.status(501).json({error: "GET /api/auth/login not implement"})
}
async function me (req, res) { 
  res.status(501).json({error: "GET /api/auth/me not implement"})
}
module.exports = {register, login, me};