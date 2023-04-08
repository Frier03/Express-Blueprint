const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler')
const authRouter = require('./routes/auth0')

const app = express()

app.use(express.json());
app.use('/api/auth0/', authRouter)
app.use(errorHandler)


app.listen(8888, () => {
    console.log('Server listening on port 8888')
})