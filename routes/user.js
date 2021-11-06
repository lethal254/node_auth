const express = require("express")
const { verifyToken } = require("../Middleware/authmiddleware")

const router = express.Router()

router.get("/", verifyToken, (req, res) => {
  res.json("You just hit the users route")
})

module.exports = router
