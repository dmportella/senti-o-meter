'use strict';

class Utils {
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
}

module.exports = Utils;
