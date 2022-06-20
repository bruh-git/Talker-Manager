const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { readContentFile } = require('./helpers/readWriteFile');

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
/* app.use(validateAuthorization); */
/* const validUser = {
  email: 'email@email.com',
  password: '123456',
}; */

/* app.post('/login', validateAuthorization, validateEmail, validatePasseword, (req, res) => {
  const { email, password } = req.body; */

/*   if (!email || !password) {
    return res.status(401).json({ message: 'email or password can`t be blank!' });
  }

  if (email !== validUser.email || password !== validUser.password) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  } */
/*   if (!email || !password) {
    return res.status(401).json({ message: 'email or password can`t be blank!' });
  }
  res.status(200).json(validateAuthorization);
  }); */

// Requisio 5
/* app.post('/talker', validateAuthorization, validateToken,
validateName, validateAge,
validateTalk, validateWatchedAt,
validateWatchedAt, validateRate, (_req, res) => {
  res.status(200).json({ message: 'Valid Token!' });
  }); */
