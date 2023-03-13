/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from 'express';
import { CompilerError } from './compiler/ast/compilerError';
// eslint-disable-next-line no-var
var app = express();
import { Compiler } from './compiler/compiler';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  console.log('Hello!');
  return response.send('Hello!');
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
app.get('/download', (request, response) => {
  console.log('download!');
  const file = path.join(__dirname, '../latex/tcc.pdf');
  sleep(2000).then(() => {
    response.download(file, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Downloaded');
      }
    });
  });
});

app.post('/', (req: Request, res: Response) => {
  const { text, genC } = req.body;
  const compiler = new Compiler(text);
  try {
    const result = compiler.program();
    if (genC) result.genC();

    console.log('Passou no try', new Date().toLocaleTimeString());
    res.json({ result: result, error: null });
  } catch (error) {
    console.log('Passou no catch', new Date().toLocaleTimeString());
    const { line, token, message } = error as unknown as CompilerError;
    res.json({ result: null, error: { line, token, message } });
  }
});

export default app;
