const mongoose= require ("mongoose");
const chalk= require("chalk");
require('dotenv').config();

const {DB_HOST, DB_NAME, DB_PORT} = process.env
const MONGODB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log(chalk.blue(`Database is connected on ${MONGODB_URL}`)))
.catch(err => console.error(err));
