const argon2 = require("argon2");
const UserModel = require("../models/user.models");

async function register({ username, email, password }) {
  const existingEmail = UserModel.findByEmail(email);
  if (existingEmail) {
    throw makeError(409, "Email already exists");
  }

  const existingUsername = UserModel.findByUsername(username);
  if (existingUsername) {
    throw makeError(409, "Username already exists");
  }

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  });

  const result = UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const user = UserModel.findById(result.lastInsertRowid);
  return user;
}

async function login({ identifier, password }) {
  const userByEmail = UserModel.findByEmail(identifier);
  const userByUsername = userByEmail ? null : UserModel.findByUsername(identifier);
  const user = userByEmail || userByUsername;

  if (!user) {
    throw makeError(401, "Invalid credentials");
  }

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    throw makeError(401, "Invalid credentials");
  }

  return UserModel.findById(user.id);
}
async function me(userId) {
  const user = UserModel.findById(userId);
  if (!user) {
    throw makeError(404, "User not found");
  }
  return user;
}



module.exports = { register, login, me };
