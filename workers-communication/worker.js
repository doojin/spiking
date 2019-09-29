const { parentPort } = require('worker_threads');

parentPort.on('message', message => {
    console.log(`Worker received from parent: ${message}`);
    setTimeout(() => parentPort.postMessage('222'), 3000);
});