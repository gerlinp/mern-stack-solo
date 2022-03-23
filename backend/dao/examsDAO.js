import { ObjectId } from "mongodb"

let exams 

export default class ExamsDao {
    static async injectDB(conn) {
        if (exams) {
            return
        }
        try {
            exams = await conn.db(process.env.TECH_DIVE_EXAM_NS).collection("exams")
        } catch (e) {
            console.error(
                `Unable to establish a colleciton handle in examsDAO: ${e}`,
            )
        }
    }

    static async getExams({
        filters = null,
        page = 0,
        examsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if("name" in filters) {
                    query = { $text: { $search: filters["patient_Id"] } } //query = { $text: { $search: filters["name"] } }
            } else if ("key_findings" in filters) {
                query = { "key_findings": { $eq: filters["key_findings"] } } //query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }
        
        let cursor
        try {
            cursor = await exams //cursor = await restaraunts
            .find(query)
        } catch (e) {
            console.log.error(`Unable to issue find command, ${e}`)
            return { examsList: [], totalNumExams: 0 } //return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(examsPerPage).skip(examsPerPage * page)//const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const examsList = await displayCursor.toArray() //const restaurantsList = await displayCursor.toArray()
            const totalNumExams = await exams.countDocuments(query)// const totalNumRestaurants = await restaurants.countDocuments(query)

            return { examsList, totalNumExams} //return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,)
            return { examList: [], totalNumExams: 0 } //return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }
}
      
