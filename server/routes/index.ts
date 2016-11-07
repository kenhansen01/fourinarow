import express = require('express');

const router = express.Router();

/**
 * Match any route not containing 'api' and serve index.html, Angular handles other routes
 */
router.get(/^(.(?!api))*$/, (req, res, next) => {
  res.render('index.html');
});

export = router;
