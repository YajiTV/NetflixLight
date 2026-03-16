const argon2 = require("argon2");
const UserModel = require("../models/user.models"); 

function makeError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

async function register({username, email, password}) {
    const existingEmail = UserModel.findByEmail(email);
    if (existingEmail) {
        throw makeError(409, "Email already exists")
    }
    const existingUsername = UserModel.findByUsername(username); 
    if (existingUsername){
        throw makeError(406, "Username already exists");
    }
    const hashedPassword = await argon2.hash(password, {type : argon2.argon2id});
    const result = UserModel.create({
        username,
        email,
        password: hashedPassword,
    });
    const user = UserModel.findById(result.lastInsertRowid)
    return user;
}
module.exports = {register} ; 