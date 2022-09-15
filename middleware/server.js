const express = require ('express');
const app = express();
const { errorHandler } = rewuire('./middleware/errorMiddleware');

//Middleware
app.use(Express.json());

//Routes 
app.use('/api/note', rewuire('./routes/note'))

//Error Middleware 
app.use(errorHandler);

const PORT = PROCESS.ENV.port || 5432;

app.listen(PORT, () => {
  console.log('server is listening at http://localhost:${PORT}');
});