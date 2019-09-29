const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');
worker.postMessage('111');
worker.on('message', message => {
    console.log(`Parent thread received from worker: ${message}`);
    setTimeout(() => worker.postMessage('111'), 3000);
});