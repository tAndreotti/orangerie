const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

// text route
router.get("/", (req, res) => {
  res.send("API runfando atualizada");
});

module.exports = router;
