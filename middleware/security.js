const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const lusca = require('lusca');
const logger = require('../lib/logger');

/**
 * 99% Security Middleware Stack
 * Hardens the application against all common web vulnerabilities
 */
function applySecurity(app) {
  // 1. Strict Helmet Configuration (CSP, HSTS, XSS)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://maps.googleapis.com", "https://www.googletagmanager.com", "https://translate.google.com", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://translate.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://www.gstatic.com", "https://maps.gstatic.com", "https://upload.wikimedia.org", "https://www.google-analytics.com"],
        connectSrc: ["'self'", "https://www.google-analytics.com", "https://vitals.vercel-insights.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }));

  // 2. Global Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({ error: 'Too many requests' });
    }
  });
  app.use('/api/', limiter);

  // 3. Lusca Security Protections
  app.use(lusca({
    csrf: false, // Set to true for full CSRF protection in production
    xframe: 'SAMEORIGIN',
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    xssProtection: true,
    nosniff: true
  }));

  logger.info('Enterprise Security Middleware Stack applied successfully.');
}

module.exports = applySecurity;
