var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(
  {
  	name: "Classifier API",
  	links: [
  		{
  			name: "classifier",
  			rel: "self",
  			type: "application/json",
  			href: req.originalUrl
  		}
  	]
  });
});

module.exports = router;
