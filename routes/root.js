const express = require('express');
const router = express.Router();
const path = require('path');

// What if somebody request /index.html or only /index
// express helps to handle this by regular expression
// ^ starts with
// $ ends with
// * any character
// ^/$|/index.html
// Handle the optional .html extension
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;