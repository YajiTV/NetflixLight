const app = require('./app'); 
const { getEnv } = require('./config/env'); // import env
const db = require('./config/db'); // import db

const env = getEnv();

app.listen(env.PORT, () => {
  console.log(`Server starting on http://localhost:${env.PORT}`); //port 3000 
});
