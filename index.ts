import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { taskskRouter } from './src/tasks/tasks.router';

const app: Express = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// Create connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'todo',
  entities: [Task],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data source has been initialized!');
  })
  .catch((err) =>
    console.log(
      'Error during data source initialization',
      err,
    ),
  );

app.use('/tasks', taskskRouter);
