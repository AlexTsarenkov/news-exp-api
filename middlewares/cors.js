const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://alextsarenkov.github.io/news-exp-frontend/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
};

module.exports = { cors };
