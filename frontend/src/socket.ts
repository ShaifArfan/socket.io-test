import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === 'production'
    ? undefined
    : 'http://localhost:8000';

export const socket: Socket = io(URL!, {
  autoConnect: false,
});
