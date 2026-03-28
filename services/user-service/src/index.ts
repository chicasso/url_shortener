import cors from 'cors';
import bodyParser from 'body-parser';
import { App, ping, error, notFound } from "@url-shortener/common";
import { router } from "./routes/index.ts";

const app = (await new App('user-service').init()).getApp();

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'],
    // allowedHeaders: '*',
    // credentials: true,
    // preflightContinue: true,
  }),
);

app.options('*', cors());

app.get('/ping', ping);

app.use('/api/v1', router);

app.use(error);

app.use('*', notFound);
