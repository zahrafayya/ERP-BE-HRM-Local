import { Router } from 'express';
import { AmalController } from '../controllers/amal.controller';

const router = Router();
const amalController = new AmalController();

router.get('/', (req, res) => amalController.findAll(req, res));
router.get('/:id', (req, res) => amalController.findByID(req, res));
router.post('/', (req, res) => amalController.create(req, res));
router.put('/:id', (req, res) => amalController.update(req, res));
router.delete('/:id', (req, res) => amalController.delete(req, res));

export default router;
