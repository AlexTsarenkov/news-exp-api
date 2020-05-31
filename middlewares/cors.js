const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://alextsarenkov.github.io');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
};

module.exports = { cors };
