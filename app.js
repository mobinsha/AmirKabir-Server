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

app.use('/login', require("./routes/client/login"))
app.use('/blogs', require("./routes/client/blog"))
app.use('/slides', require("./routes/client/slide"))
app.use('/contact', require("./routes/client/contact"))

// inline variable
// const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];
// app.use('/admin/users', applyAuthMiddleware(['owner', 'admin', 'manager']), require("./routes/admin/user"));
// app.use('/admin/blogs', applyAuthMiddleware(['owner', 'admin', 'manager']), require("./routes/admin/blog"));
// app.use('/admin/slides', applyAuthMiddleware(['owner', 'admin', 'manager']), require("./routes/admin/slide"));


const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];
app.use(applyAuthMiddleware(['owner', 'admin', 'manager']))
app.use('/admin/users', require("./routes/admin/user"))
app.use('/admin/blogs', require("./routes/admin/blog"))
app.use('/admin/slides', require("./routes/admin/slide"))

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => res.status(404).json({ message: 'API address is wrong' }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app
