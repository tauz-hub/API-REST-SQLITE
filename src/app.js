import express from 'express';
import 'dotenv/config';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import router from './routes/routes.js';
import logger from './middleware/logger.js';

const app = express();
const { PORTHTTP, PORTHTTPS } = process.env;

app.use(cors());
app.use(logger('./src/Loggers/logger.json'));
app.use(router);

app.listen(PORTHTTP, () => console.log('\x1b[32m\x1b[1mApi Rodando em [http]'));

https
  .createServer(
    {
      cert: fs.readFileSync('src/SSL/code.crt'),
      key: fs.readFileSync('src/SSL/code.key'),
    },
    app
  )
  .listen(PORTHTTPS, () => {
    console.log('Api Rodando em [https]\x1b[0m');
  });
