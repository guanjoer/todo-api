const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017';
async function connectToDbServer() {
	const client = await MongoClient.connect(
		MONGO_DB_URI
	);

	database = client.db('todo-api');
};

function getDb() {
	if(!database) {
		throw new Error('MongoDB 서버와의 연결을 확인하세요!');
	};

	return database;
};

module.exports = {
	connectToDbServer: connectToDbServer,
	getDb: getDb
};