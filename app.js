const express = require('express');
const cors = require('cors');
const server = require('./server');

const carouselRouter = require('./routes/carouselRouter');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  server.sync({ alter: true }).then(() => {
    console.log('Alter and re-sync DB.');
  });
} else {
  server.sync().then(() => {
    console.log('sync DB.');
  });
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 3) ROUTES
app.use('/api/carousels', carouselRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
