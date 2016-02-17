'use strict';

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
}

module.exports = NegotiationBuilder;
