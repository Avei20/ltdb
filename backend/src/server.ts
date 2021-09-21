import { PrismaClient } from "@prisma/client";
import express from "express"
import Router from "./routes/router"
import {SERVER_PORT} from './constant'

const prisma = new PrismaClient()
const server = express()

server.disable('x-powered-by')

server.use (express.urlencoded({extended: true}))
server.use ('/', Router)

server.listen(SERVER_PORT, ()=> {
    console.log(`Server start at port ${SERVER_PORT}`)
})