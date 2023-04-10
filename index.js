const express = require('express')

const db = require('./utils/db')
const logger = require('./utils/logger')
const { errorHandler } = require('./middlewares/errorHandler')
const { authMiddleware } = require('./middlewares/authMiddleware')
const { validateInput } = require('./middlewares/inputValidation')
const authRouter = require('./routes/auth0')
const auth2faRouter = require('./routes/auth2fa')

const app = express()
const pool = db.getConnection()

app.use(express.json());

app.use('/api/0auth/login', validateInput(['username', 'password']), authMiddleware)
app.use('/api/0auth/', authRouter)
app.use('/api/0auth2/', auth2faRouter)

app.use(errorHandler)

app.listen(8888, () => {
    logger.info(`Server started listening`, { port: 8888, action: 'Started server' })
})