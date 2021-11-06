require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./db")

// Routes
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")

// Variables
const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
