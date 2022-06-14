const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const geraStringAleatoria = (tamanho) => {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < tamanho; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
};

const validateAuthorization = (_req, res, next) => {
  /* const { authorization } = req.headers; */
  const token = geraStringAleatoria(16);
  
/* if (authorization !== token) return res.status(401).json([]); */

  res.status(200).json(`token: ${token}`);

  next();
};

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

app.use(validateAuthorization);
/* const validUser = {
  email: 'email@email.com',
  password: '123456',
}; */

app.post('/login', (req, res) => {
  const { email, password } = req.body;

/*   if (!email || !password) {
    return res.status(401).json({ message: 'email or password can`t be blank!' });
  }

  if (email !== validUser.email || password !== validUser.password) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  } */
  if (!email || !password) {
    return res.status(401).json({ message: 'email or password can`t be blank!' });
  }
  res.status(200).json(validateAuthorization);
  });

app.post('/talker', (req, res) => {
    const { authorization } = req.headers;
    const { name, age, talk } = req.body;
    const { watchedAt,rate } = talk;
    const token = authorization;
    const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
  if (token === '') return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    res.status(200).json({ message: 'Valid Token!' });
  if (name.length === '') return res.status(400).json({ message: `O ${name} é deve ter pelo menos 3 caracteres` });
  if (name.length !== 3) return res.status(400).json({ message: `O campo ${name} é obrigatório` });
  if (age === '') return res.status(400).json({ message: `O campo ${age} é obrigatório` });
  if (age < 18) return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  if (talk === '') return res.status(400).json({ message: `O campo ${talk} é obrigatório` });
  if (watchedAt === '') return res.status(400).json({ message: `O campo ${watchedAt} é obrigatório` });
  if (watchedAt !== regex) return res.status(400).json({ message: `O campo ${watchedAt} deve ter o formato \"dd/mm/aaaa\"` });
  if (rate === '') return res.status(400).json({ message: `O campo ${rate} é obrigatório` });
  if (rate > 5) return res.status(400).json({ message: `O campo ${rate}deve ser um inteiro de 1 à 5` });
    res.status(201).json(talker);
  });
