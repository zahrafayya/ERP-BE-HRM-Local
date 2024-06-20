import { Router } from 'express';
import { OvertimeController } from '../controllers/overtime.controller';

const router = Router();
const overtimeController = new OvertimeController();

router.get('/', (req, res) => overtimeController.findAll(req, res));
router.get('/:id', (req, res) => overtimeController.findByID(req, res));
router.post('/', (req, res) => overtimeController.create(req, res));
router.put('/', (req, res) => overtimeController.update(req, res));
router.delete('/', (req, res) => overtimeController.delete(req, res));

export default router;
