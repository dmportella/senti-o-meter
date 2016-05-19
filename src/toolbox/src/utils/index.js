'use strict';
const fs = require('fs');

class Utils {
	static uuidPattern() {
		return '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
	}

	static getParameter(name, value, regex) {
		const param = (value || '').replace(regex, '').toLowerCase();

		if (!param.trim() || param === '') {
			const uriError = new URIError();
			uriError.message = 'The uri parameters \' ${name} \' is missing.';
			uriError.status = 400;
			throw uriError;
		}

		return param;
	}

	static loadJson(filepath) {
		const file = fs.readFileSync(filepath);

		return JSON.parse(file);
	}
}

module.exports = Utils;
