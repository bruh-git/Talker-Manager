const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { readContentFile } = require('./helpers/readWriteFile');
const randomToken = require('./helpers/randomToken');
const { isValidEmail, isValidPassword } = require('./middlewares/validations');

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

// Requisito 1
const PATH_FILE = './talker.json';

app.get('/talker', async (_req, res) => {
  const teams = await readContentFile(PATH_FILE) || [];

  res.status(200).json({ teams });
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
const { id } = req.params;
const content = await fs.readFile('./talker.json');
const talker = JSON.parse(content);
const talkerIndex = talker.find((t) => t.id === Number(id));
if (!talkerIndex) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
res.status(200).json(talkerIndex);
});

// Requisito 3

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const token = randomToken(16);
  return res.status(200).json({ token });
  });

// Requisio 5
/* app.post('/talker', validateAuthorization, validateToken,
validateName, validateAge,
validateTalk, validateWatchedAt,
validateWatchedAt, validateRate, (_req, res) => {
  res.status(200).json({ message: 'Valid Token!' });
  }); */
