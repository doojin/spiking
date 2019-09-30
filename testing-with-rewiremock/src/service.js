const library = require('./library');

module.exports = {
    calculate(x, y, z) {
        return library.sum(x, y) * z * library.number;
    }
};