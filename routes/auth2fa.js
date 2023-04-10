const express = require('express')

const otpServce = require('../services/otpService')
const config = require('../config.json')
const logger = require('../utils/logger')
const router = express.Router()

router.post('/otp/generate', (req, res) => {
    const otp = otpServce.generateOTP()
    res.status(200).send(otp)
});

router.post('/otp/verify', (req, res) => {});

router.post('/otp/validate', (req, res) => {});

router.post('/otp/enable', (req, res) => {});

router.post('/otp/disable', (req, res) => {});

module.exports = router