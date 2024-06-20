import { Router } from 'express';
import { BukpotController } from '../controllers/bukpot.controller';

const router = Router();
const bukpotController = new BukpotController();

router.get('/', (req, res) => bukpotController.findAll(req, res));
router.get('/:id', (req, res) => bukpotController.findByID(req, res));
router.post('/', (req, res) => bukpotController.create(req, res));
router.post('/count', (req, res) => bukpotController.count(req, res));
router.get('/count_neto/:ptkp_id/:penghasilan_netto', (req, res) => bukpotController.countNetto(req, res));
router.put('/:id', (req, res) => bukpotController.update(req, res));
router.delete('/:id', (req, res) => bukpotController.delete(req, res));

export default router;
