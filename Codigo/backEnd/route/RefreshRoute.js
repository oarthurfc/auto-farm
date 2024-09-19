const express = require('express');
const router = express.Router();

const refreshTokenController = require('../controller/RefreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router; 