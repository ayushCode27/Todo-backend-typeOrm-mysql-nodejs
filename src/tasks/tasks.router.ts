import { Router, Request, Response } from 'express';
import { TaskController } from './tasks.controller';
import { createValidator } from './task.validator';
import { validationResult } from 'express-validator';

export const taskskRouter: Router = Router();

taskskRouter.get(
  '/',
  async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const allTasks = await taskController.getAll();
    res.json(allTasks).status(200);
  },
);

taskskRouter.post(
  '/',
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .json({ errors: errors.array() })
        .status(400);
    }
    // const taskController = new TaskController();
  },
);
