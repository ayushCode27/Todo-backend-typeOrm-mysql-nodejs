import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';

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

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World</h1>');
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
