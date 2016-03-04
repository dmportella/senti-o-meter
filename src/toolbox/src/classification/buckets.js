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
		this.data = [];

		_.each(utils.loadJson(`${__dirname}/../../tests/test-data/classifers.json`),
			(item) => this.data.push(Bucket.fromJSON(item)));
	}

	getBucketByIdOrName(uuidOrName) {
		const bucket = _.find(this.data,
			(item) => item.id === uuidOrName || item.name === uuidOrName);

		return bucket;
	}

	postBucket(bucket) {
		if (bucket && bucket.name && !_.find(this.data,
			(item) => item.name === bucket.name)) {
			/* eslint-disable no-param-reassign */
			bucket.id = uuid.v1();
			/* eslint-disable no-param-reassign */
			this.data.push(bucket);
			return bucket.id;
		}

		throw new Error('Bucket already exists.');
	}

	patchBucket(id, bucket) {
		const existingBucket = this.getBucketByIdOrName(id);

		if (existingBucket) {
			Object.assign(existingBucket, bucket);

			return existingBucket;
		}

		throw new Error('Bucket doesnt exists.');
	}
}

module.exports = function CreateRepository() {
	return new BucketRepository('database');
};
