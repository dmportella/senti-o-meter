var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(
  {
  	name: "Learning API",
  	links: [
  		{
  			name: "service discovery",
  			rel: "self",
  			type: "application/json",
  			href: req.originalUrl
  		},
  		{
  			name: "learn",
  			rel: "action",
  			type: "application/json",
  			href: path.join(req.originalUrl, "/:classifier/learn"),
  			params: [
  				{
  					name: "classifier",
  					type: "string",
  					required: true
  				}
  			]
  		}
  	]
  });
}).post('/:classifier/learn', function(req, res, next) {
	var classifier = (req.params.classifier || "").replace(/[^a-zA-Z-]/gi, '').toLowerCase();

    if(!classifier.trim() || classifier === "") {
        var uriError = new URIError();
        uriError.message = "The uri parameters classifier is missing.";
        uriError.status = 400;
        throw uriError;
    }

    res.status(204).send();
});

module.exports = router;
