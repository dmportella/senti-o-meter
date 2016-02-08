'use strict';
const express = require('express');
const router = new express.Router();
const path = require('path');
const url = require('url');
const helpers = require('hateoas-helpers');

/* GET home page. */
router
	.all('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.all('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res) => {
		const callingUrl = url.parse(req.originalUrl);
		res.status(200).send(
			{
				name: 'Toolbox API',
				links: [
					{
						name: 'toolbox',
						rel: 'self',
						type: 'application/json',
						href: callingUrl.pathname
					},
					{
						name: 'classifiers',
						rel: 'self',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/classifiers')
					},
					{
						name: 'learning',
						rel: 'self',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/learning')
					}
				]
			});
	});

module.exports = router;
