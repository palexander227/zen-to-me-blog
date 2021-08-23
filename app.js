const express = require('express')
const exphbs = require('express-handlebars')
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const path = require('path');

const flash = require('express-flash')
const apiRoutes = require('./routes/api');
const hbsRoutes = require('./routes/hbs');

const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3005
// server setup __________________________________
var sessionStore = new session.MemoryStore;
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(express.json({}))
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});
app.use('/api', apiRoutes);
app.use( hbsRoutes);
app.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

app.listen(PORT, () => {console.log(`listening on port${PORT}`)})

