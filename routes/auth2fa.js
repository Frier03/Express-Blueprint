const express = require('express')

const config = require('../config.json')
const logger = require('../utils/logger')
const router = express.Router()

router.post('/otp/generate', (req, res) => {});

router.post('/otp/verify', (req, res) => {});

router.post('/otp/validate', (req, res) => {});

router.post('/otp/enable', (req, res) => {});

router.post('/otp/disable', (req, res) => {});

module.exports = router