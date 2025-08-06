// server/middleware/security.js
const rateLimit = require('express-rate-limit');
module.exports = {
  applySecurity: (app) => {
    // Block common exploits
    app.use((req, res, next) => {
      const badPatterns = [
        /\.\.\//, /\/etc\//, /union.*select/i
      ];
      if (badPatterns.some(p => p.test(req.url))) {
        return res.status(403).send('Forbidden');
      }
      next();
    });
    // Rate limiting
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests'
    }));
  }
};
