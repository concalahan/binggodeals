var express = require("express");
var router = express.Router();

var tool = require('../services/tools');

router.get('/', (req, res) => {
  asyncCall().then((results) => {
    res.send("Hello Kitty");
  });
});

async function asyncCall(){
  var getUrlTiki = await tool.getUrlTiki();
  // for (var i =0;i<getUrlTiki.URLs.length;i++) {
  //   console.log(getUrlTiki.URLs[i]);
  // }
  return 1;
}

module.exports = router;
