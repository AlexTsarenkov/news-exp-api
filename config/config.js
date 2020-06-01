const {
  DB_PATH = 'mongodb://localhost:27017/news-app-db',
  JWT_SECRET = 'supersecretkey',
  PORT = 3000,
  API_KEY = '',
} = process.env;

module.exports = {
  DB_PATH,
  JWT_SECRET,
  PORT,
  API_KEY,
};
