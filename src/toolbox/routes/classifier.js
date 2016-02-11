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
		res.set('location', path.join(req.originalUrl, '999'));
		res.status(201).send();
	})
	.patch('/:id',
		(req, res, next) => helpers.checkMethod(['patch'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.patch('/:id',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.patch('/:id', (req, res) => {
		const id = (req.params.id || '').replace(/[^a-zA-Z0-9-]/gi, '').toLowerCase();

		if (!id.trim() || id === '') {
			const uriError = new URIError();
			uriError.message = 'The uri parameters id is missing.';
			uriError.status = 400;
			throw uriError;
		}

		res.status(200).send(
			{
				id: '1212121',
				name: 'asdasdasd'
			});
	})
	.get('/:id',
		(req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/:id',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/:id', (req, res) => {
		const id = (req.params.id || '').replace(/[^a-zA-Z0-9-]/gi, '').toLowerCase();

		if (!id.trim() || id === '') {
			const uriError = new URIError();
			uriError.message = 'The uri parameters id is missing.';
			uriError.status = 400;
			throw uriError;
		}

		res.status(200).send(
			{
				id: '1212121',
				name: 'asdasdasd'
			});
	});

module.exports = router;
