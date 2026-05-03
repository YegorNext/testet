import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import { createServer, Server } from 'http';

import helmet from 'helmet';
//import cors from 'cors';
import morgan from 'morgan';

import domainRouter from './routes/domain.routes';


const PORT: number = parseInt(process.env.PORT || '3000', 10);

// const options = {
//   origin: '*',
// };

const app: Express = express();

//Middleware
app.use(helmet());

//app.use(cors(options));
app.use(express.json());
app.use(
  morgan('dev', {
    skip: (req) =>
      process.env.NODE_ENV === 'prod' &&
      (req.originalUrl.startsWith('/api-docs') || req.originalUrl.includes('favicon')),
  }),
);

//handlers
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.use('/api/domain', domainRouter);


const server: Server = createServer(app);

// main function
const run = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Server failed to start: ${error.message}`);
  }
};

run();
