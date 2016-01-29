var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(
  {
  	name: "Toolbox API",
  	links: [
  		{
  			name: "toolbox",
  			rel: "self",
  			type: "application/json",
  			href: req.originalUrl
  		},
  		{
  			name: "classifiers",
  			rel: "self",
  			type: "application/json",
  			href: path.join(req.originalUrl, "/classifiers")
  		},
  		{
  			name: "learning",
  			rel: "self",
  			type: "application/json",
  			href: path.join(req.originalUrl, "/learning")
  		}
  	]
  });
});

module.exports = router;
