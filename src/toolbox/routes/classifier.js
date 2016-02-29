const express = require('express');
const router = new express.Router();
const helpers = require('hateoas-helpers');
const path = require('path');
const url = require('url');
const classification = require('../src/classification');
const utils = require('../src/utils');
const negotiation = require('../src/negotiation');

/* GET home page. */
router
	.get('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res, next) => {
		const callingUrl = url.parse(req.originalUrl);
		negotiation.withRoute('classifiers')
			.withPayload(
			{
				name: 'Classifier API',
				links: [
					{
						name: 'service discovery',
						rel: 'self',
						method: 'get',
						type: 'application/json',
						href: callingUrl.pathname
					},
					{
						name: 'Create Classifier',
						rel: 'create',
						method: 'post',
						type: 'application/json',
						href: callingUrl.pathname
					},
					{
						name: 'Patch Classifier',
						rel: 'patch',
						method: 'patch',
						type: 'application/json',
						href: path.join(callingUrl.pathname, '/:id'),
						params: [
							{
								name: 'id',
								type: 'uuid',
								required: true
							}
						]
					}
				]
			})
			.withStatus(200)
			.send(req, res, next);
	})
	.post('/',
		(req, res, next) => helpers.checkMethod(['post'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.post('/', (req, res, next) => {
		classification.Buckets.postBucket(req.body);

		res.location(path.join(req.originalUrl, req.body.id));

		negotiation.withRoute('classifiers')
				.withStatus(201)
				.send(req, res, next);
	})
	.patch('/:id',
		(req, res, next) => helpers.checkMethod(['patch'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.patch('/:id', (req, res, next) => {
		const id = utils.getParameter('id', req.params.id || '', '/[^a-zA-Z0-9-]/gi');

		const bucket = classification.Buckets.getBucketByIdOrName(id);

		if (!bucket) {
			negotiation.return404(next);
		} else {
			// TODO modify & save

			negotiation.withRoute('classifier')
				.withPayload(bucket)
				.withStatus(200)
				.send(req, res, next);
		}
	})
	.get('/:id',
		(req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/:id', (req, res, next) => {
		const id = utils.getParameter('id', req.params.id || '', '/[^a-zA-Z0-9-]/gi');

		const bucket = classification.Buckets.getBucketByIdOrName(id);

		if (!bucket) {
			negotiation.return404(next);
		} else {
			negotiation.withRoute('classifier')
				.withPayload(bucket)
				.withStatus(200)
				.send(req, res, next);
		}
	});

module.exports = router;
