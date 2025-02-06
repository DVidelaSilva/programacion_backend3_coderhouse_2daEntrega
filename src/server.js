import express from 'express'
import envConfig from './configs/envConfig.js'
import appRouter from './routes/appRouter.js'
import connectMongoDB from './configs/mongoDBConfig.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerOptions from './configs/swagger.config.js'
import {initializePassport} from './configs/passportConfig.js'
import passport from 'passport'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(appRouter)


initializePassport()
app.use(passport.initialize())

connectMongoDB()


const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.listen(envConfig.port, () => {
    console.log(`Servidor corriendo en puerto ${envConfig.port}`);
})