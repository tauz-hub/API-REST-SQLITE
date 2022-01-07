import express from "express";
import 'dotenv/config'
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import router from './routes.js'
const app = express()
const portHttp = process.env.PORTHTTP
const portHttps = process.env.PORTHTTPS

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(portHttp, () => console.log("Api Rodando em http."))

https.createServer({
  cert: fs.readFileSync('src/SSL/code.crt'),
  key: fs.readFileSync('src/SSL/code.key')
}, app).listen(portHttps, () => console.log("Api Rodando em https."));