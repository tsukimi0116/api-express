import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import dayjs from 'dayjs'
import models from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// * Routes * //

app.use('/users', routes.user);
app.use('/attendance', routes.attendance);
app.use('/leave', routes.leave);
app.use('/getCurrentTime',(req,res)=>{
  res.send(dayjs().format('YYYY-MM-DD HH:mm:ss'))
})

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

app.get('*', function(req, res){
  res.status(404).send('404 Page not found!! ');
});