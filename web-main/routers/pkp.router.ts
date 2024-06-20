import { Router } from 'express';
import { PKPController } from '../controllers/pkp.controller';

const router = Router();
const pkpController = new PKPController();

router.get('/', (req, res) => pkpController.findAll(req, res));
router.get('/:id', (req, res) => pkpController.findByID(req, res));
router.post('/', (req, res) => pkpController.create(req, res));
router.put('/:id', (req, res) => pkpController.update(req, res));
router.delete('/:id', (req, res) => pkpController.delete(req, res));

export default router;
