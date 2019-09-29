const { Worker } = require('worker_threads');

class WorkerUnit {

    constructor(filename) {
        this._worker = new Worker(filename);
    }

    process(taskId) {
        this._worker.postMessage(taskId);
        
        return new Promise(resolve => {
            this._worker.on('message', () => resolve());
        });
    }
}

module.exports = WorkerUnit;