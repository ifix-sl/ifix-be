import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { UserController } from "./controller/UserController"
import { config } from "dotenv"

config()

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.get("/", (req, res) => {
        console.log("Some Request is coming.!")
        res.send("App is working fine.!")
    })

    // setup express app here
    // ...

    const userCtrl = new UserController()

    app.post("/users", userCtrl.register)

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
