const express = require('express')

const { errorHandler } = require('./middlewares/errorHandler')
const { authMiddleware } = require('./middlewares/authMiddleware')
const { validateInput } = require('./middlewares/inputValidation')
const authRouter = require('./routes/auth0')
const logger = require('./utils/logger')

const app = express()

app.use(express.json());
app.use('/api/auth0/login', validateInput(['username', 'password']), authMiddleware)
app.use('/api/auth0/register', validateInput(['mail', 'username', 'password']))
app.use('/api/auth0/', authRouter)

app.use(errorHandler)

app.listen(8888, () => {
    logger.info(`Server started listening`, { port: 8888, action: 'Started server' })
})