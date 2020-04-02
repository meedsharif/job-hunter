const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const sharedsession = require("express-socket.io-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
// Load Env variables
dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const server = require(process.env.PROTOCOL).Server(app)
const io = require('socket.io')(server);
require('./socketio/socket')(io);


const publicRouter = require('./routes/public');
const postRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');

const MONGODB_URI = process.env.MONGO_URI;
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// connect-mongodb-session configs for storing to mongodb;
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});

let sess = {
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
	store: store,
};

app.use(
	session(sess)
);
io.use(sharedsession(session(sess), {
	autoSave:true
})); 
app.use(flash())

// Setup EJS
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use((req, res, next) => {
	res.locals.isLoggedIn = req.session.isLoggedIn;
	next();
})

// Routers
app.use(publicRouter);
app.use(postRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

app.use((req, res) => {
	res.send('404');
})


const db = mongoose.connection;
// Show error if the connection fails
db.on('error', console.error.bind(console, 'connection error:'));

// Run the app once the app is connected to the database
db.once('open', () => {
	server.listen(process.env.PORT || 3000, () => {
		console.log('Running');
	});
});
