import ExamsDAO from "../dao/examsDAO.js" //import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class ExamsController { //export default class RestaurantsController {
  static async apiGetExams(req, res, next) { //static async apiGetRestaurants(req, res, next) {
    const examsPerPage = req.query.examsPerPage ? parseInt(req.query.examsPerPage, 10) : 20 //    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20 
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.key_findings) {
      filters.key_findings = req.query.key_findings
    } else if (req.query.key_findings) {
      filters.key_findings = req.query.key_findings
    } else if (req.query.patient_Id) {
      filters.patient_Id = req.query.patient_Id
    }

    const { examsList, totalNumExams } = await ExamsDAO.getExams({
      filters,
      page,
      examsPerPage,
    })

    let response = {
      Exams: examsList,
      page: page,
      filters: filters,
      entries_per_page: examsPerPage,
      total_results: totalNumExams,
    }
    res.json(response)
  }
  static async apiGetExamsById(req, res, next) {
    try {
      let id = req.params.id || {}
      let exam = await ExamsDAO.getExamByID(id)
      if (!exam) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(exam)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetExamKey_findings(req, res, next) {
    try {
      let key_findings = await ExamsDAO.getKey_findings()
      res.json(key_findings)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}