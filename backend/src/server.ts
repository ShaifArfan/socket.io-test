import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import allRoutes from './routes';
import { portInUseErrorLogs } from './utils/showErrorLogs';

// dotenv
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const server = express();

const httpServer = createServer(server);
const io = new IOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('io connected on ' + socket.id);
});

const count = io.engine.clientsCount;
console.log(count);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}||`);
});

// middleware
// server.use(morgan('tiny'));
// server.use(express.json());

// // routes
// server.use('/api', allRoutes);

// server
//   .listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   })
//   .on('error', (error: any) => {
//     if (error.code === 'EADDRINUSE') {
//       portInUseErrorLogs(PORT);
//       process.exit(1);
//     }
//   });
