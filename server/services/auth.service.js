function register(username, password) { 
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, hashedPassword);
}

function login(username, password) {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid username or password');
    }
    return user;
}