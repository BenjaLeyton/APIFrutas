import express from 'express';
import bodyParser from 'body-parser';
import initializeDatabase from './models/db';  
import frutasRouter from './routes/endpoints';
import { handleError } from './utils/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();  

app.use(bodyParser.json());

app.use('/api', frutasRouter);

app.use((err: any, req: any, res: any, next: any) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
