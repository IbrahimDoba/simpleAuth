const express = require("express");

const { login, signup, isAuthController,forgotPassword } = require("../controller/userController");
const { validateToken } = require("../auth/JWT");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.get("/isauth", validateToken, isAuthController);

// router.get('/profile', profile)

module.exports = router;
export {};
