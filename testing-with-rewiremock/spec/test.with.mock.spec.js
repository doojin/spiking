const rewiremock = require("rewiremock/node");

describe("calculate", () => {
  let library;
  let service;

  beforeEach(() => {
    library = jasmine.createSpyObj("library", ["sum"]);
    rewiremock("../src/library").with(library);

    rewiremock.enable();
    service = require("../src/service");
    rewiremock.disable();
  });

  it("returns correct value", () => {
    library.sum.and.returnValue(50);
    expect(service.calculate(1, 2, 3)).toEqual(150);
  });
});
