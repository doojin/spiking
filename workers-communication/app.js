const WorkerUnit = require('./worker-unit');

let taskId = 1;

const worker = new WorkerUnit('./worker.js');

async function startLoop() {
    await worker.process(taskId++);
    startLoop();
}

startLoop();