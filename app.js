const express = require('express');
const bodyparser = require('body-parser');

const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');


const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(publicRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Running");
});
