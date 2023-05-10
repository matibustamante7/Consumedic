
const {getAllPayments} = require("../controllers/payments/getAllPayments")

const getPayments = async (req, res)=>{
    try {
        const result = await getAllPayments();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPayments,
}