'use strict';
const redis = require('redis');
const settings = require('../settings');

class Repository {
	constructor() {
		this.database = redis.createClient(settings.databases.redis);
	}

	checkItemExists(key) {
		return new Promise((accept, reject) => {
			this.database.get(key, (err, reply) => {
				console.log(err, reply);
				if (err) {
					reject(err);
				} else {
					accept(true);
				}
			});
		});
	}

	getItem(key) {
		return new Promise((accept, reject) => {
			this.database.get(key, (err, reply) => {
				console.log(err, reply);
				if (err) {
					reject(err);
				} else {
					accept(reply);
				}
			});
		})
		.then((reply) => JSON.parse(reply));
	}

	postItem(key, item) {
		return new Promise((accept, reject) => {
			this.database.set(key, JSON.stringify(item), (err, reply) => {
				console.log(err, reply);
				if (err) {
					reject(err);
				} else {
					accept(reply);
				}
			});
		}).then(() => item.id);
	}
}

module.exports = Repository;
