const workerApi = require('./worker-api');

workerApi.process(taskId => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Task ${taskId} processed`);
            resolve();
        }, 2000);
    });
});