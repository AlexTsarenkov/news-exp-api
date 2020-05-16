const rateLimit = require('express-rate-limit');

const apiLimit = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 50,
});

module.exports = {
  apiLimit,
};
