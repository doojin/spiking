const vm = require("vm");
const request = require("request");

const data = [];

const add = obj => data.push(obj);
const getInfo = () =>
  new Promise((resolve, reject) => {
    request(
      "https://jsonplaceholder.typicode.com/posts/1",
      (error, _, body) => {
        return error ? reject(error) : resolve(body);
      }
    );
  });

const sandbox = {
  api: {
    add,
    getInfo
  }
};
vm.createContext(sandbox);

const code = `
  const x = 5;
  const y = 8;

  api.add(x + y);

  api.getInfo().then(post => api.add(post));
`;

const run = async () => {
    await vm.runInContext(code, sandbox);
    console.log(data);
};

run();
