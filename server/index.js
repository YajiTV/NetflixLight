const app = require('./app'); 
const { getEnv } = require('./config/env');
const db = require('./config/db');

const env = getEnv();

app.listen(env.PORT, () => {
  console.log(`Server starting on http://localhost:${env.PORT}`);
});
