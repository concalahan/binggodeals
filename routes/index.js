var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  return res.send("hello");
});

module.exports = router;
