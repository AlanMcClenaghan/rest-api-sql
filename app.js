'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const { sequelize } = require('./models');

const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

/* Use Sequelize's authenticate function to test the database connection. 
A message should be logged to the console informing the user 
that the connection was successful or that there was an error.*/
/* Use the sequelize.authenticate() method to asynchronously connect to the database 
and log out a message indicating that a connection has/hasn’t been established */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Express
app.use(express.json());

// Add routes.
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
