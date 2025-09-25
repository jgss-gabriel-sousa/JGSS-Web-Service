const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Web Server is Online!" });
});

module.exports = router;
