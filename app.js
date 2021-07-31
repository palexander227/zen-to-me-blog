const express = require('express')
const exphbs = require('express-handlebars')
const router = require('express').Router();
const apiRoutes = require('./routes/api');
const hbsRoutes = require('./routes/hbs');

const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3005
// server setup __________________________________
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(express.json({}))
app.use(session({secret:"super-secret", saveUninitialized: true, resave: true}))
let sess; 
app.use('/api', apiRoutes);
app.use( hbsRoutes);
app.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});


app.listen(PORT, () => {console.log(`listening on port${PORT}`)})