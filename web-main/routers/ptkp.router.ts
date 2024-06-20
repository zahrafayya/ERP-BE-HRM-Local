import { Router } from 'express';
import { PTKPController } from '../controllers/ptkp.controller';

const router = Router();
const ptkpController = new PTKPController();

router.get('/', (req, res) => ptkpController.findAll(req, res));
router.get('/:id', (req, res) => ptkpController.findByID(req, res));
router.post('/', (req, res) => ptkpController.create(req, res));
router.put('/:id', (req, res) => ptkpController.update(req, res));
router.delete('/:id', (req, res) => ptkpController.delete(req, res));

export default router;
