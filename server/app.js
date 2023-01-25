import express from 'express';
import cors from 'cors';

import connect from './db/connect.js';
import router from './routes/logs.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use('/', router);

app.use('*', (req, res) => {
  res.status(404).send('wrong url');
});

const port = process.env.PORT || 5000;
const uri =
  'mongodb+srv://sourovch:2o4my6god8*6@fullstackprojects.wftxd.mongodb.net/travel_logs?retryWrites=true&w=majority';

connect(uri, () => {
  app.listen(port, () =>
    console.log('server is connected to port ' + port)
  );
});
