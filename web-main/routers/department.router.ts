import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';

const router = Router();
const departmentController = new DepartmentController();

router.get('/', (req, res) => departmentController.findAll(req, res));
router.get('/:id', (req, res) => departmentController.findByID(req, res));
router.post('/', (req, res) => departmentController.create(req, res));
router.put('/:id', (req, res) => departmentController.update(req, res));
router.delete('/:id', (req, res) => departmentController.delete(req, res));

export default router;
