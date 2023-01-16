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

const cors = require(`cors`)
app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: "GET,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization, Cookie",
    credentials: true,
  })
)

app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cookie parser
app.use(cookieParser())

// ejs
app.set(`view engine`, `ejs`)

// before auth router
const beforeAuthRouter = require(`./routes/before-auth`)
app.use(`/`, beforeAuthRouter)

// email verification
const emailVerification = require(`./routes/confirmation`)
app.use(`/`, emailVerification)

// layout routing
const layoutRouter = require(`./routes/layout`)
app.use(`/`, layoutRouter)

// calendar
const calendarRouter = require(`./routes/calendar`)
app.use(`/`, calendarRouter)

// classes
const classesRouter = require(`./routes/classes`)
app.use(`/`, classesRouter)

// summaries
const summariesRouter = require(`./routes/summaries`)
app.use(`/`, summariesRouter)

// assignments
const assignmentsRouter = require(`./routes/assignments.js`)
app.use(`/`, assignmentsRouter)

// assignments
const editorRouter = require(`./routes/editor.js`)
app.use(`/`, editorRouter)

// setting up the server
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => {
      console.log(
        `Server is connected to database and listening on port: ${port}...`
      )
    })
  } catch (error) {
    console.log(`Something went wrong.`)
  }
}

start()
