const {
  DB_PATH = 'mongodb://localhost:27017/news-app-db',
  JWT_SECRET = 'supersecretkey',
  PORT = 3000,
  API_KEY = 'ac2e0a7306984672bffe23f1cbdd8f60',
} = process.env;

module.exports = {
  DB_PATH,
  JWT_SECRET,
  PORT,
  API_KEY,
};
