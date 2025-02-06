import { Router } from "express";

import userRouter from './users.router.js';
import petRouter from './pets.router.js'
import sessionRouter from "./sessions.router.js";
import adoptionRouter from './adoptions.router.js'
import mockRouter from './mocks.router.js'



const appRouter = Router()


appRouter.use('/users', userRouter)
appRouter.use('/pets', petRouter)
appRouter.use('/sessions', sessionRouter)
appRouter.use('/adoption', adoptionRouter)
appRouter.use('/', mockRouter)


export default appRouter