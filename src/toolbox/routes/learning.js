const express = require('express');
const router = new express.Router();
const path = require('path');
const url = require('url');
const helpers = require('hateoas-helpers');
const utils = require('../src/utils');
const negotiation = require('../src/negotiation');
const classification = require('../src/classification');

router
	.get('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res, next) => {
		const callingUrl = url.parse(req.originalUrl);
		negotiation.withRoute('learning')
			.withPayload(
			{
				name: 'Learning API',
				links: [
					{
						name: 'service discovery',
						rel: 'self',
						method: 'get',
						type: 'application/json',
						href: callingUrl.pathname
					}],
				actions: [
					{
						name: 'learn',
						rel: 'learn',
						method: 'post',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/:classifier/learn'),
						params: [
							{
								name: 'classifier',
								type: 'string',
								required: true
							}
						]
					}
				]
			})
			.withStatus(200)
			.send(req, res, next);
	})
	.post('/:bucket/learn',
		(req, res, next) => helpers.checkMethod(['post'], req, res, next))
	.post('/:bucket/learn',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.post('/:bucket/learn',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.post('/:bucket/learn', (req, res, next) => {
		const id = utils.getParameter('bucket', req.params.bucket || '', '/[^a-zA-Z0-9-]/gi');

		const bucket = classification.Buckets.getBucketByIdOrName(id);

		if (!bucket) {
			negotiation.return400(next, 'Bucket not found.');
		} else {
			// classify

			negotiation.withRoute('learning')
			.withStatus(204)
			.send(req, res, next);
		}
	});

module.exports = router;
