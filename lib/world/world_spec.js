var World = require('./world.js');

describe("World", function() {
  it("initializes", function() {
    const w = new World();
    expect(w).toBeDefined();
  });

  it("has a liveCells field", function() {
    const w = new World(
      [
        [0, 0],
        [1, 1],
        [3, 3]
      ]
    );
    expect(w.liveCells.length).toBe(3);
  });

  it("isAlive returns false", function() {
    const w = new World(
      [
        [0, 0],
        [1, 1],
        [3, 3]
      ]
    );
    expect( w.isAlive([4,4]) ).toBe(false);
  });

  it("isAlive returns true", function() {
    const w = new World(
      [
        [0, 0],
        [1, 1],
        [3, 3]
      ]
    );
    expect( w.isAlive([1,1]) ).toBe(true);
  });

  it("creates the correct next generation", function() {
    const points = [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9]]
    const expectedPoints = [
      [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [6, 8]]

    const w = new World(points);
    const nextIteration = w.nextGeneration();

    expect( nextIteration.liveCells.length ).toBe(expectedPoints.length);
    expectedPoints.forEach((cell) => {
      expect( nextIteration.isAlive(cell) ).toBe(true);
    });
  });
});
