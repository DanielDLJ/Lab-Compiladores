/* eslint-disable no-var */
import app from './server';
import dotenv from 'dotenv';
import { checkPDF } from './helpers/fileAndFolderHandler';

dotenv.config();

const port = process.env.PORT;

var server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
var io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST'],
  },
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
io.on('connection', (socket: any) => {
  // Manipule a conexão do socket aqui
  console.log('a user connected');
  socket.on('pdf-status', (data: any) => {
    if (checkPDF()) {
      console.log('PDF gerado');
      sleep(2000).then(() => {
        socket.emit('messageResponse', 'pdf criado');
      });
    } else {
      socket.emit('messageResponse', 'pdf nao criado');
    }
    console.log('pdf-status', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
