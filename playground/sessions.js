const express = require('express');

const app = express();
const session = require('express-session');

app.use(session({
  secret: 'cenk-session-secret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  const name = 'Cenk SARI';

  req.session.name = name;

  res.send('Session generated');
});

app.get('/readsession', (req, res) => {
  if (req.session.name) res.send(req.session.name);

  res.send('Session not found');
});

app.get('/destroysession', (req, res) => {
  if (req.session.name) {
    req.session.destroy();

    res.send('Session destroyed');
  } else {
    res.send('Session not found');
  }

  res.end();
});

app.listen(8000, () => {
  console.log('Server started!');
});
