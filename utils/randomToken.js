const randomToken = (length) => {
  let randomString = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return randomString;
};
module.exports = randomToken;