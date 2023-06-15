import { validationResult } from 'express-validator';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

class TaskController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: { date: 'ASC' },
      });

      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (_error) {
      return res
        .json({ error: 'Internal server error' })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .json({ errors: errors.array() })
        .status(400);
    }
    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (_error) {
      return res
        .json({ error: 'Internal server error' })
        .status(500);
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .json({ errors: errors.array() })
        .status(400);
    }
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({ where: { id: req.body.id } });

      if (!task) {
        return res
          .send(404)
          .json({ error: 'Task does not exists' });
      }

      let updatedTask: UpdateResult;
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );
      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;
      return res.send(updatedTask).status(202);
    } catch (_error) {
      return res
        .json({ error: 'Internal server error' })
        .status(500);
    }
  }
}

export const taskController = new TaskController();
