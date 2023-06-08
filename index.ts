import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const app: Express = express();
dotenv.config();

// Create connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
});

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World</h1>');
});

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log('Listening on port: ' + Port);
});
