import mongoose from 'mongoose'

const {DB_HOST, DB_NAME} = process.env
const MONGODB_URL = `mongodb://${DB_HOST}/${DB_NAME}`

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));