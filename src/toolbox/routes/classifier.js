const express = require('express');
const router = new express.Router();
const helpers = require('hateoas-helpers');
const path = require('path');
const url = require('url');

/* GET home page. */
router
	.get('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res) => {
		const callingUrl = url.parse(req.originalUrl);
		res.status(200).json(
			{
				name: 'Classifier API',
				links: [
					{
						name: 'service discovery',
						rel: 'self',
						method: 'get',
						type: 'application/json',
						href: callingUrl.pathname
					}
				]
			});
	})
	.post('/',
		(req, res, next) => helpers.checkMethod(['post'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.post('/', (req, res) => {
		res.set('location', path.join(req.originalUrl, '999'));
		res.status(201).send();
	})
	.patch('/',
		(req, res, next) => helpers.checkMethod(['patch'], req, res, next))
	.patch('/',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.patch('/',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.patch('/', (req, res) => {
		res.set('location', path.join(req.originalUrl, '999'));
		res.status(201).send();
	});

module.exports = router;
