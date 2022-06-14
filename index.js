const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const fs = require('fs');

fs.readFileSync('./talker.json');

const talker = require('./talker');

app.get('/talker', (_req, res) => {
  if (!talker) return res.status(200).json([]);

  res.status(200).json(talker);
});

app.get('/talker/:id', (req, res) => {
const { id } = req.params;
const talkerIndex = talker.find((t) => t.id === Number(id));
if (!talkerIndex) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
res.status(200).json(talkerIndex);
});