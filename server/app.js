require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
//db
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')
const blogsRouter = require('./routes/blogs')
const inboxRouter = require('./routes/inbox')
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/blogs', blogsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/inbox', inboxRouter)

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
