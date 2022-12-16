require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
//?this is for hosting : to avoid hosting problem , more on =>  https://www.npmjs.com/package/express-rate-limit
app.set('trust proxy', 1)

const cors = require('cors')
app.use(cors())
//db
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const stripeRouter = require('./routes/stripe')
app.use('/api/v1/webhook', stripeRouter)
app.use(express.json());
// security packages
const xssClean = require('xss-clean')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')

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

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
}))
app.use(helmet())
app.use(xssClean())

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
