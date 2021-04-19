var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('hitting this route')
  console.log(req.body)
  res.set("Access-Control-Allow-Origin", "*");
  res.send('respond with a resource');
});

router.post("/", (req, res) => {
  console.log(req.body)
  res.set("Access-Control-Allow-Origin", "*");
  res.send("user post route");
});

module.exports = router;
