const mongoose = require("mongoose")

const db = mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connection was succesful")
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = db
