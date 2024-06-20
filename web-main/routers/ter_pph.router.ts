import { Router } from 'express';
import { TerPPHController } from '../controllers/ter_pph.controller';

const router = Router();
const terPPHController = new TerPPHController();

router.get('/', (req, res) => terPPHController.findAll(req, res));
router.get('/:id', (req, res) => terPPHController.findByID(req, res));
router.post('/', (req, res) => terPPHController.create(req, res));
router.put('/:id', (req, res) => terPPHController.update(req, res));
router.delete('/:id', (req, res) => terPPHController.delete(req, res));
router.post('/income', (req, res) => terPPHController.getByIncome(req, res))

export default router;
