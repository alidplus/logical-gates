import * as utils from "../utils";

describe("Utils specs", () => {
  it("build id", () => {
    const id = utils.generateId();
    expect(id).toBeDefined();
    expect(typeof id).toBe('string')
    expect(id.length > 10).toBe(true)
  });

  it("build initial argument objects", () => {
    const label = "label"
    const argument = utils.generateArgument(label);
    expect(argument).toBeDefined();
    expect(argument.label).toBe(label)
    expect(argument.id).toBeDefined()
    expect(typeof argument.id).toBe('string')
    expect(typeof argument.value).toBe('object')
    expect(typeof argument.value.id).toBe('string')
  });

  it("build initial constant objects", () => {
    const constant = utils.generateConstant();
    expect(constant).toBeDefined();
    expect(constant.id).toBeDefined()
    expect(constant.value).toBe(true)
    expect(typeof constant.id).toBe('string')
  });

  it("build initial operatable objects", () => {
    const id = "empty"
    const operatable = utils.generateOperatable(id);
    expect(operatable).toBeDefined();
    expect(operatable.id).toBeDefined()
    expect(operatable.id).toBe(id)
    expect(operatable.value).toBe(null)
    expect(typeof operatable.id).toBe('string')
  });
});


describe("Utils / logical specs", () => {
  it("evaluate array of booleans with AND operation", () => {
    expect(utils.evaluateAnd([true, true, true])).toBe(true);
    expect(utils.evaluateAnd([true, false, true])).toBe(false);
    expect(utils.evaluateAnd([false, false, false])).toBe(false);
  });

  it("evaluate array of booleans with OR operation", () => {
    expect(utils.evaluateOr([true, true, true])).toBe(true);
    expect(utils.evaluateOr([true, false, false])).toBe(true);
    expect(utils.evaluateOr([false, false, false])).toBe(false);
  });

  it("evaluate array of booleans with XOR operation", () => {
    expect(utils.evaluateXor([true, true, true])).toBe(true);
    expect(utils.evaluateXor([true, false, true])).toBe(false);
    expect(utils.evaluateXor([true, false, false])).toBe(true);
    expect(utils.evaluateXor([false, false, false])).toBe(false);
  });

  it("evaluate empty operatable object", () => {
    const operatable = utils.generateOperatable("empty");
    expect(utils.evaluateOperation(operatable)).toBe(undefined);
  });

  it("evaluate constant operatable object", () => {
    const operatable = utils.generateOperatable("constant");
    operatable.value = utils.generateConstant()
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value.value = false
    expect(utils.evaluateOperation(operatable)).toBe(false);
  });

  it("evaluate argument operatable object", () => {
    const operatable = utils.generateOperatable("getArray");
    operatable.value = utils.generateArgument()
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value.value.value = false
    expect(utils.evaluateOperation(operatable)).toBe(false);
  });

  it("evaluate AND operatables array", () => {
    const operatable = utils.generateOperatable("and");
    operatable.value = [
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant()
    ]
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value[0].value = false
    expect(utils.evaluateOperation(operatable)).toBe(false);
    operatable.value = operatable.value.map(constant => ({ ...constant, value: false}))
    expect(utils.evaluateOperation(operatable)).toBe(false);
    operatable.value[0].value = true
    expect(utils.evaluateOperation(operatable)).toBe(false);
  });

  it("evaluate OR operatables array", () => {
    const operatable = utils.generateOperatable("or");
    operatable.value = [
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant()
    ]
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value[0].value = false
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value = operatable.value.map(constant => ({ ...constant, value: false}))
    expect(utils.evaluateOperation(operatable)).toBe(false);
    operatable.value[0].value = true
    expect(utils.evaluateOperation(operatable)).toBe(true);
  });

  it("evaluate XOR operatables array", () => {
    const operatable = utils.generateOperatable("xor");
    operatable.value = [
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant(),
      utils.generateConstant()
    ]
    expect(utils.evaluateOperation(operatable)).toBe(false);
    operatable.value[0].value = false
    expect(utils.evaluateOperation(operatable)).toBe(true);
    operatable.value = operatable.value.map(constant => ({ ...constant, value: false}))
    expect(utils.evaluateOperation(operatable)).toBe(false);
    operatable.value[0].value = true
    expect(utils.evaluateOperation(operatable)).toBe(true);
  });
});
