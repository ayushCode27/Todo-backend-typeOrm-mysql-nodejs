import { Router, Request, Response } from 'express';

export const taskskRouter: Router = Router();

taskskRouter.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World</h1>');
});
