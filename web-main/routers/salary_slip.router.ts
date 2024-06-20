import { Router } from 'express';
import { SalarySlipController } from '../controllers/salary_slip.controller';

const router = Router();
const salarySlipController = new SalarySlipController();

router.get('/white', (req, res) => salarySlipController.findAllWhite(req, res));
router.get('/blue', (req, res) => salarySlipController.findAllBlue(req, res));
router.get('/:id', (req, res) => salarySlipController.findByID(req, res));
router.post('/', (req, res) => salarySlipController.create(req, res));
router.put('/bulk_status_update', (req, res) => salarySlipController.bulkUpdateStatus(req, res));
router.post('/base_white', (req, res) => salarySlipController.countBaseWhite(req, res));
router.post('/base_hour_white', (req, res) => salarySlipController.countHourBaseWhite(req, res));
router.get('/count_white/:id', (req, res) => salarySlipController.countWhiteSalarySlipByID(req, res));
router.get('/count_blue/:id/:tunjangan_lain', (req, res) => salarySlipController.countBlueSalarySlipByID(req, res));
router.put('/:id', (req, res) => salarySlipController.update(req, res));
router.delete('/:id', (req, res) => salarySlipController.delete(req, res));
router.post('/count', (req, res) => salarySlipController.count(req, res));

export default router;
