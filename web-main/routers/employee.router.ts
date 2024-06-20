import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

const router = Router();
const employeeController = new EmployeeController();

router.get('/', (req, res) => employeeController.findAll(req, res));
router.get('/white', (req, res) => employeeController.findAllWhiteCollar(req, res));
router.get('/blue', (req, res) => employeeController.findAllBlueCollar(req, res));
router.get('/pemotong', (req, res) => employeeController.findAllPemotong(req, res));
router.get('/:id', (req, res) => employeeController.findByID(req, res));
router.post('/', (req, res) => employeeController.create(req, res));
router.put('/:id', (req, res) => employeeController.update(req, res));
router.put('/update_verified/:year', (req, res) => employeeController.updatePTKPVerification(req, res));
router.delete('/:id', (req, res) => employeeController.delete(req, res));
router.post('/available_employees', (req, res) => employeeController.getEmployeeAvailability(req, res));


export default router;
