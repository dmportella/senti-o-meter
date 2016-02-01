const express = require('express');
const router = new express.Router();
const helpers = require('hateoas-helpers');

/* GET home page. */
router
	.all('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.all('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res) => {
		res.status(200).send(
			{
				name: 'Classifier API',
				links: [
					{
						name: 'service discovery',
						rel: 'self',
						type: 'application/json',
						href: req.originalUrl
					}
				]
			});
	});

module.exports = router;
