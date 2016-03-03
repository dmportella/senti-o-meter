'use strict';
const uuid = require('uuid');
const utils = require('../utils');
const _ = require('underscore');

class Bucket {
	constructor(name) {
		this.id = uuid.v1();
		this.name = name;
		this.description = '';
		this.created = new Date();
		this.categories = [];
	}

	static fromJSON(data) {
		const bucket = new Bucket();

		Object.assign(bucket, data);

		return bucket;
	}
}

class BucketRepository {
	constructor(database) {
		this.database = database;
		/* eslint-disable no-undef */
		this.data = utils.loadJson(`${_dirname}/../../tests/data/classifers.json`);
		/* eslint-disable no-undef */
	}

	getBucketByIdOrName(uuidOrName) {
		const bucket = _.find(this.data,
			(item) => item.id === uuidOrName || item.name === uuidOrName);

		return Bucket.fromJSON(bucket);
	}

	postBucket(bucket) {
		if (bucket && bucket.name && !_.find(this.data,
			(item) => item.name === bucket.name)) {
			this.data.push(bucket);
			return uuid.v1();
		}

		throw new Error('Bucket already exists.');
	}
}

module.exports = function CreateRepository() {
	return new BucketRepository('database');
};
