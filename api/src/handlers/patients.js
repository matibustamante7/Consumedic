const { getPatient } = require("../controllers/patients/getPatient")
const {getAllPatients} = require("../controllers/patients/getAllPatients")
const {getPatientById} = require("../controllers/patients/getPatientById")
const {createPatient} = require("../controllers/patients/createPatient")
const {modifyPatient} = require("../controllers/patients/modifyPatient")


const getPatients = async (req, res)=>{
    const {name} = req.query;
    try {
        const result = name ? await getPatient(name) : await getAllPatients();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPatientsById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await getPatientById(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const postPatient = async (req, res) => {
    const { dni, email, password, telefono, nombre, apellido } = req.body;
    try {
        const result = await createPatient(dni, email, password, telefono, nombre, apellido)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const putPatient = async (req, res) => {
    const {id,status}=req.body;
    try {
        const result = await modifyPatient(id,status);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    getPatients,
    getPatientsById,
    postPatient,
    putPatient
}