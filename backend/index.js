import express from "express"
import dotenv from "dotenv"
import { initdb } from "./config/db.js"

import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT
initdb()

app.use(express.json())
app.use("/api/transactions", transactionRoutes)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
