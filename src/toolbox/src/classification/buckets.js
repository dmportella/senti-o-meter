'use strict';
const uuid = require('uuid');
const Repository = require('../repository');

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

class BucketRepository extends Repository {
	constructor() {
		super();
	}

	bucketExists(uuidOrName) {
		return super.checkItemExists(`bucket:${uuidOrName}`);
	}

	getBucketById(uuidOrName) {
		return super.checkItemExists(`bucket:${uuidOrName}`)
					.then(reply => super.getItem(`bucket:${uuidOrName}`))
					.catch(err => console.log(err));
	}

	postBucket(bucket) {
		const item = bucket;
		const id = item && item.id
			? item.id
			: (() => {
				item.id = uuid.v1();
				return item.id;
			})();

		return super.postItem(`bucket:${id}`, item);
	}

	patchBucket(id, bucket) {
		return this.getBucketById(id)
					.then(reply => Object.assign(reply, bucket))
					.then(reply => this.postBucket(reply));
	}
}

module.exports = function CreateRepository() {
	return new BucketRepository();
};
