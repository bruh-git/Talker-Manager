const randomToken = require('../utils/randomToken');

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (
    !email.includes('@')
    || !email.includes('.com')
  ) res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!/^[0-9]{6}$/.test(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const token = randomToken(16);
  
if (authorization !== token) return res.status(401).json([]);
  res.status(200).json(`token: ${token}`);
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  const tokenLength = randomToken(16);

  if (token === '') return res.status(401).json({ message: 'Token não encontrado' });
  if (tokenLength.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (talk === '') return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;

  if (watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (watchedAt !== regex) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === '') return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!/^[0-9]{1,5}$/.test(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  validateAuthorization,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};