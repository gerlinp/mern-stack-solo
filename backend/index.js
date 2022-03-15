import app from "./server.js"
import mongodb from "mongodb"
import dotenv from  "dotenv"
import ExamsDao from "./dao/examsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.TECH_DIVE_EXAM_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ExamsDao.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on the port ${port}`)
    })
})