import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import allRoutes from './routes';
import { portInUseErrorLogs } from './utils/showErrorLogs';

const db = {
  1: {
    name: 'John',
    age: 29,
  },
  2: {
    name: 'Jane',
    age: 22,
  },
};

let string = 'server';

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

io.on('connect', (socket) => {
  console.log('io connected on ' + socket.id);

  io.use((socket, next) => {
    console.log('middleware io use ' + socket.id);
    next();
  });

  const count = io.engine.clientsCount;
  console.log(count);
  socket.join('room1');
  console.log(socket.rooms);

  socket.on('custom-event', (id, callback) => {
    if (!id) return;
    const data = db[id];
    if (!data) return;
    callback({
      data,
    });
  });

  // socket.broadcast.emit('broadcast', 'i am broadcasting');

  socket.on('set-string', (data) => {
    console.log(data);
    string = data;

    // socket.emit('get-string', data);
  });

  socket.broadcast.emit('get-string', string);

  // io.sockets.on('disconnect', (socket) => {
  //   socket.disconnect();
  //   console.log('io disconnected');
  //   const count = io.engine.clientsCount;
  //   console.log(count);
  // });

  // io.on('error', (error) => {
  //   console.log('error ' + error);
  //   socket.disconnect();
  // });
});

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
