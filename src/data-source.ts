import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { readFileSync } from "fs"

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

export const AppDataSource = new DataSource({
    type: "mysql",
    url: "mysql://admin:pwd12345@handysof.cicfy9uorxv9.ap-southeast-1.rds.amazonaws.com:3306/ifix",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
        ca: readFileSync("./src/config/us-east-1-bundle.pem").toString()
    }
})
