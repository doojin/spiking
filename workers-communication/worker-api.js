const { parentPort } = require('worker_threads');

const getTaskId = async () => {
    return new Promise(resolve => {
        parentPort.on('message', taskId => {
            resolve(taskId);
        });
    });
};

module.exports = {
    async process(fn) {
        const taskId = await getTaskId();
        await fn(taskId);
        this.process(fn);
        parentPort.postMessage('finished');
    }
};