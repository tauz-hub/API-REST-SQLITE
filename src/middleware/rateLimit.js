import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 1 * 60 * 1000,
  keyGenerator: (req) => {
    return req.ip;
  },
  handler: (_req, res) => {
    res.status(429).send('Você obteve um limite de request');
  },
  max: 60,
  standardHeaders: true,
  legacyHeaders: true,
});
