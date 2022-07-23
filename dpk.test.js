const { deterministicPartitionKey } = require("./dpk");


describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Event object without partition key", () => {
    const partitionKey = deterministicPartitionKey({
      id: "abc"
    });
    expect(typeof partitionKey).toBe("string");
    expect(partitionKey.length).toBeLessThanOrEqual(256);

    // expecting same output on rerun
    expect(partitionKey).toBe(deterministicPartitionKey({
      id: "abc"
    }));
  });

  it("Checking case with event object with partition key", () => {
    const partitionKey = deterministicPartitionKey({
      partitionKey: 12345678
    });
    expect(partitionKey).toBe("12345678");
  });


  it("Checking case with event with partition key longer than limit", () => {

    const partitionKey = deterministicPartitionKey({
      partitionKey: "x".repeat(257)
    });
    expect(typeof partitionKey).toBe("string");
    // length of hex encoded sha3-512 is 128
    expect(partitionKey.length).toBe(128);
  });
});
