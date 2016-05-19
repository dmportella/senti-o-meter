'use strict';
const express = require('express');
const router = new express.Router();
const path = require('path');
const url = require('url');
const helpers = require('hateoas-helpers');
const negotiation = require('../src/negotiation');

/* GET home page. */
router
	.get('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res, next) => {
		const callingUrl = url.parse(req.originalUrl);
		negotiation.route()
			.withPayload(
			{
				name: 'Toolbox API',
				links: [
					{
						name: 'toolbox',
						rel: 'self',
						method: 'get',
						type: 'application/json',
						href: callingUrl.pathname
					},
					{
						name: 'classifiers',
						rel: 'classifiers',
						method: 'get',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/classifiers')
					},
					{
						name: 'learning',
						rel: 'learning',
						method: 'get',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/learning')
					}
				]
			})
		.withStatus(200)
		.send(req, res, next);
	});

module.exports = router;
