const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');

const app = express();
// Load Environment Variables
dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@job-hunter-9aedm.gcp.mongodb.net/${process.env.MONGO_COLLECTION}`;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
// Show error if the connection fails
db.on('error',  console.error.bind(console, 'connection error:'));

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
    console.log("Running");
  });
});
