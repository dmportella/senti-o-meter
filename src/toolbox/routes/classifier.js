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
			});
	})
	.post('/',
		(req, res, next) => helpers.checkMethod(['post'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.post('/',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.post('/', (req, res) => {
		res.location(path.join(req.originalUrl, '999'));
		res.status(201).send();
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

			res.status(200).send(bucket);
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
			res.status(200).send(bucket);
		}
	});

module.exports = router;
