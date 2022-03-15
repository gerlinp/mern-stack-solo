import express from "express"
import cors from "cors"
import exams from "./api/exams.route.js" //import restartaunts from "./api/restartaunts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/exams", exams) //app.use("/api/v1/restaurants", restaurants) 
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app