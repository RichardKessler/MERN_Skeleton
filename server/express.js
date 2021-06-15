import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// comment out before building for production
import devBundle from './devBundle'



const app = express()

// comment out before production
devBundle.compile(app)

// parse body and attache the to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure app by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.get('/', (req, res) => {
    res.status(200).send(Template())
})

export default app