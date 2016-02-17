'use strict';

class Bucket {
	constructor(name) {
		this.Name = name;
	}
}

class BucketRepository {
	constructor(database) {
		this.database = database;
	}

	getBucketByIdOrName(uuidOrName) {
		if (uuidOrName % 2 === 0) {
			return undefined;
		}

		return new Bucket(uuidOrName);
	}
}

module.exports = function CreateRepository() {
	return new BucketRepository('database');
};
