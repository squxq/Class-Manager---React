// imports !!
require(`dotenv`).config()
const express = require(`express`)
const app = express()
// const path = require(`path`)
const cookieParser = require(`cookie-parser`)
// const { StatusCodes } = require(`http-status-codes`)

// no public assets to access by NOW !!!                    ---- Public Assets 

// database
const connectDB = require(`./db/connect.js`)

app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cookie parser
app.use(cookieParser())

// CORS
app.use((req, res, next) => {
    res.append(`Access-Control-Allow-Origin`, `http://localhost:5173`)
    res.append('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true')
    next();
})

// ejs
app.set(`view engine`, `ejs`)

// before auth router
const beforeAuthRouter = require(`./routes/before-auth`)
app.use(`/`, beforeAuthRouter)

// auth middleware
const auth = require(`./middleware/auth`)

// confirmation link
const confirmationRouter = require(`./routes/confirmation`)
app.use(`/confirmation/:id`, auth, confirmationRouter)

// setting up the server
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () => {
            console.log(`Server is connected to database and listening on port: ${port}...`);
        })
    } catch (error) {
        console.log(`Something went wrong.`);
    }
}

start ()