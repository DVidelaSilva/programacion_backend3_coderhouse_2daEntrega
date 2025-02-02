import { Router } from "express";

import userRouter from './users.router.js';
import petRouter from './pets.router.js'
import mockRouter from './mocks.router.js'



const appRouter = Router()


appRouter.use('/users', userRouter)
appRouter.use('/pets', petRouter)
appRouter.use('/', mockRouter)


export default appRouter