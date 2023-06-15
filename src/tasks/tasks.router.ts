import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './task.validator';

export const taskskRouter: Router = Router();

taskskRouter.get('/', taskController.getAll);

taskskRouter.post(
  '/',
  createValidator,
  taskController.create,
);
