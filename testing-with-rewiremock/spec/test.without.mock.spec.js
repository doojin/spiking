const service = require('../src/service');

describe('calculate', () => {

    it('returns correct value', () => {
        expect(service.calculate(1, 2, 3)).toEqual(9);
    });

});