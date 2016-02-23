'use strict';

class Negotiation {
	constructor(routeName) {
		this.routeName = routeName;
	}

	withPayload(data) {
		this.data = data;
		return this;
	}

	withStatus(code) {
		this.code = code;
		return this;
	}

	send(req, res, next) {
		res.format({
			json: () => {
				if (this.code) {
					res.status(this.code);
				}

				res.send(this.data);
			},
			html: () => {
				res.status(this.code).render(this.routeName, { data: this.data });
			},
			text: () => {
				res.status(this.code).send(this.data);
			},
			default: () => {
				const err = new Error('Not Acceptable');
				err.status = 406;

				next(err);
			}
		});
	}
}

class NegotiationBuilder {
	static return404(next) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	}

	static return400(next, message) {
		const err = new Error('Bad request');
		err.status = 400;

		if (message) {
			err.info = message;
		}

		next(err);
	}

	static withRoute(name) {
		return new Negotiation(name);
	}
}

module.exports = NegotiationBuilder;
