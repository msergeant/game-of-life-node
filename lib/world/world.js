module.exports = class World {
    constructor( cells) {
      this.liveCells = cells;
    }

    isAlive([x, y]) {
      let alive = false;

      for (let [cellX,cellY] of this.liveCells) {
        if(cellX == x && cellY == y) {
          alive = true;
          break;
        }
      };

      return alive;
    }

    nextGeneration() {
      const cells = this._cellsToTest()
        .filter((cell) => {
          const count = this._liveNeighborCount(cell);

          return count == 3 || (this.isAlive(cell) && count == 2);
        });

      return new World(cells);
    }

    _liveNeighborCount(cell) {
      return this._neighborCells(cell)
        .filter((neighbor) => this.isAlive(neighbor))
        .length;
    }

    _cellsToTest() {
      const cells = {};
      this.liveCells.forEach((cell) => {
        cells[cell.toString()] = cell;
        this._neighborCells(cell).forEach((neighbor) => {
          cells[neighbor.toString()] = neighbor;
        });
      });

      return Object.values(cells);
    }

    _neighborCells([x,y]) {
      return [
        [x - 1, y - 1], [x - 0, y - 1], [x + 1, y - 1],
        [x - 1, y - 0],                 [x + 1, y - 0],
        [x - 1, y + 1], [x - 0, y + 1], [x + 1, y + 1]
      ]
    }
}

