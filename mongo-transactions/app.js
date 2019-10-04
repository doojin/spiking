const mongoose = require('mongoose');

async function run() {
	const connection1 = mongoose.createConnection('mongodb://localhost/transactionsSpike', { useUnifiedTopology: true });
	const connection2 = mongoose.createConnection('mongodb://localhost/transactionsSpike', { useUnifiedTopology: true });

	const TestSchema = new mongoose.Schema({
		testId: Number,
		testValue: Number
	});

	const TestModel1 = connection1.model('TestSchema', TestSchema);
	const TestModel2 = connection2.model('TestSchema', TestSchema);

	await TestModel1.deleteMany({});

	for (let i = 0; i < 10; i++) {
		await new TestModel1({ testId: i, testValue: null }).save();
	}

	await Promise.all([
		update(connection1, TestModel1, 1),
		update(connection2, TestModel2, 2)
	]);
}

async function update(connection, Model, testValue) {
	const session = await connection.startSession();
	await session.startTransaction();
	const models = await Model.find({ testValue: null }).limit(3);

	return new Promise(resolve => {
		setTimeout(async () => {
			for (let model of models) {
				model.testValue = testValue;
				await model.save();
			}
			session.commitTransaction();
			resolve();
		}, 3000);
	});
}

run();