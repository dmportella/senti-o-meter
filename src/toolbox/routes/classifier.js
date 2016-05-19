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
		negotiation.route()
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
					}],
				actions: [
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
		try {
			const bucketId = classification.Buckets.postBucket(req.body);

			res.location(path.join(req.originalUrl, bucketId));

			negotiation.route()
					.withStatus(204)
					.send(req, res, next);
		} catch (err) {
			negotiation.return400(next, err.message);
		}
	})
	.patch('/:id',
		(req, res, next) => helpers.checkMethod(['patch'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.patch('/:id', (req, res, next) => {
		const id = utils.getParameter('id', req.params.id || '', utils.uuidPattern());

		const bucket = classification.Buckets.getBucketByIdOrName(id);

		if (!bucket) {
			negotiation.return404(next);
		} else if (!req.body) {
			negotiation.return400(next, 'Missing payload.');
		} else {
			const updatedBucket = classification.Buckets.patchBucket(bucket.id, req.body);

			negotiation.route()
				.withPayload(updatedBucket)
				.withStatus(200)
				.send(req, res, next);
		}
	})
	.get('/:id',
		(req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/:id', (req, res, next) => {
		const id = utils.getParameter('id', req.params.id || '', utils.uuidPattern());

		const bucket = classification.Buckets.getBucketByIdOrName(id);

		if (!bucket) {
			negotiation.return404(next);
		} else {
			negotiation.route()
				.withPayload(bucket)
				.withStatus(200)
				.send(req, res, next);
		}
	});

module.exports = router;
