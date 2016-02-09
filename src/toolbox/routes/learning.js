const express = require('express');
const router = new express.Router();
const path = require('path');
const url = require('url');
const helpers = require('hateoas-helpers');

router
	.get('/', (req, res, next) => helpers.checkMethod(['get'], req, res, next))
	.get('/', (req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.get('/', (req, res) => {
		const callingUrl = url.parse(req.originalUrl);
		res.status(200).json(
			{
				name: 'Learning API',
				links: [
					{
						name: 'service discovery',
						rel: 'self',
						method: 'get',
						type: 'application/json',
						href: callingUrl.pathname
					},
					{
						name: 'learn',
						rel: 'action',
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
			});
	})
	.post('/:classifier/learn',
		(req, res, next) => helpers.checkMethod(['post'], req, res, next))
	.post('/:classifier/learn',
		(req, res, next) => helpers.checkAccept(['json', 'text', 'html'], req, res, next))
	.post('/:classifier/learn',
		(req, res, next) => helpers.checkType(['application/json'], req, res, next))
	.post('/:classifier/learn', (req, res) => {
		const classifier = (req.params.classifier || '').replace(/[^a-zA-Z-]/gi, '').toLowerCase();

		if (!classifier.trim() || classifier === '') {
			const uriError = new URIError();
			uriError.message = 'The uri parameters classifier is missing.';
			uriError.status = 400;
			throw uriError;
		}

		res.status(204).send();
	});

module.exports = router;
