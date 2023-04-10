// One-time password.js
const otpGenerator = require('otp-generator')

function generateOTP() {
    // Generate a random 6-digit OTP
    const otpCode = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    const createdAt = new Date()

    return {
        code: otpCode,
        createdAt: createdAt
    }
}

function sendOTPByEmail(userEmail, otpCode){
    null
}

module.exports = {
    generateOTP,
    sendOTPByEmail
}