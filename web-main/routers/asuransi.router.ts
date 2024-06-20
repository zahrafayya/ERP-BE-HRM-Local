import { Router } from 'express';
import { AsuransiController } from '../controllers/asuransi.controller';

const router = Router();
const asuransiController = new AsuransiController();

router.get('/', (req, res) => asuransiController.findAll(req, res));
router.get('/:id', (req, res) => asuransiController.findByID(req, res));
router.post('/', (req, res) => asuransiController.create(req, res));
router.put('/:id', (req, res) => asuransiController.update(req, res));
router.delete('/:id', (req, res) => asuransiController.delete(req, res));

export default router;
