const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middleware/error-handler');
const expresssession = require('express-session');

const app = express();
const clientPath = path.join(__dirname, '..', 'client');
app.use(expresssession({
  secret: 'secretkey',
  cookie: { cookie: { maxAge: 4 * 60 * 60 * 1000 }}, // 4 hour
}));

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use(express.static(clientPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  return res.sendFile(path.join(clientPath, 'index.html'));
});

app.use(errorHandler);

module.exports = app;
