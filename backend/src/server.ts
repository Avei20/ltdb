import express from "express"
import Router from "./routes/router"
import {SERVER_PORT, TIMEZONE} from './constant'
import { allowCrossDomain } from "./middleware/security/cors"

const server = express()

server.disable('x-powered-by')
server.use(allowCrossDomain)

server.use (express.urlencoded({extended: true}))
server.use (express.json())
server.use ('/', Router)

server.listen(SERVER_PORT, ()=> {
    console.log(`Server start at port ${SERVER_PORT} at ${new Date()}`)
})