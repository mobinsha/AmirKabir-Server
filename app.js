const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const fs  = require('fs')
const path  = require('path')

const errorHandler = require('./middlewares/errorHandler')
const {authenticateToken} = require("./middlewares/authenticateToken");
const {authorize} = require("./middlewares/authorize");

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setup Morgan with new struchture
const setupLogging = () => {
  const logDirectory = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });
  return process.env.NODE_ENV === 'production'
      ? morgan('combined', { stream: accessLogStream })
      : morgan('dev');
};
app.use(setupLogging());


// inline variable
app.use('/login', require("./routes/loginRouter"))
app.use('/blogs', require("./routes/blogsRouter"))
app.use('/slides', require("./routes/slideRouter"))
app.use('/contact', require("./routes/contactRouter"))

// const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];
// app.use(applyAuthMiddleware(['owner', 'admin', 'manager']))
// app.use('/users', require("./routes/userRouter"))


const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];
app.use('/users', applyAuthMiddleware(['owner', 'admin', 'manager']), require("./routes/userRouter"));


app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('*', (req, res) => res.status(404).json({ message: 'API address is wrong' }));


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app
