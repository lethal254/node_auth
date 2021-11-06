const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Signup
router.post("/signup", async (req, res) => {
  const user = new User(req.body)
  try {
    user.password = await bcrypt.hash(user.password, 8)
    await user.save()
    res.status(201).json({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Login
router.post("/login", async (req, res) => {
  const user = req.body
  try {
    const authUser = await User.findOne({ email: user.email })
    if (authUser) {
      if (await bcrypt.compare(user.password, authUser.password)) {
        const token = jwt.sign(
          { id: authUser._id, isAdmin: authUser.isAdmin },
          process.env.JWT_SECRET
        )
        res.status(200).json({
          username: authUser.username,
          email: authUser.email,
          fullName: authUser.fullName,
          token,
        })
      } else {
        res.status(500).json("Incrorrect email or password")
      }
    } else {
      res.status(500).json("User not found")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
