import express from "express"
import ExamCtrl from "./exams.controller.js"

const router = express.Router()

router.route("/").get(ExamCtrl.apiGetExams)

export default router