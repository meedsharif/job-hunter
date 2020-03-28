const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');

const app = express();
// Load Environment Variables
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
// Show error if the connection fails
db.on('error', console.error.bind(console, 'connection error:'));

// connect-mongodb-session configs for storing to mongodb;
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: store,
	})
);

// Setup EJS
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routers
app.use(publicRouter);
app.use('/auth', authRouter);

// Run the app once the app is connected to the database
db.once('open', () => {
	app.listen(process.env.PORT || 3000, () => {
		console.log('Running');
	});
});
