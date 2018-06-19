class Engine {
  constructor (width, height, callback) {
    this.width = width;
    this.height = height;
    this.field = new Field(width, height);
    this.horse = new Horse(this.field);

    this.updateField();
    this.horse.setPosition(3,4);

    setInterval(() => {
      if (this.field.freePlace()) {
        this.horse.move();
        this.updateField();
        callback();
      }
    }, 500)
  }

  updateField = () => {
    this.field.field = this.field.field.map((sub, i) => sub.map((v, j) => {
      if (v === 9) {
        return 9;
      }
      const directions = this.horse.getDirections(i, j);
      let count = 0;
      for (const d of directions) {
        if (d[0] >= 0 && d[0] < this.height && d[1] >= 0 && d[1] < this.width &&
          this.field.field[d[0]][d[1]] !== 9) {
          count++;
        }
      }
      return count;
    }));
  }
}

class Horse {
  constructor (field) {
    this.field = field;
  }

  setPosition = (i, j) => {
    this.i = i;
    this.j = j;
    this.field.field[i][j] = 9;
  }

  move = () => {
    const directions = this.getDirections(this.i, this.j);
    const width = this.field.field[0].length;
    const height = this.field.field.length;
    let min = {i: -1, j: -1, v: Infinity};
    for (const d of directions) {
      if (d[0] >= 0 && d[0] < height && d[1] >= 0 && d[1] < width) {
        if (min.v > this.field.field[d[0]][d[1]]) {
          min = {i: d[0], j: d[1], v: this.field.field[d[0]][d[1]]};
        }
      }
    }
    this.setPosition(min.i, min.j);
  }

  getDirections = (i, j) => {
    return [
      [i + 1, j + 2],
      [i + 1, j - 2],
      [i - 1, j + 2],
      [i - 1, j - 2],
      [i + 2, j + 1],
      [i + 2, j - 1],
      [i - 2, j + 1],
      [i - 2, j - 1]
    ];
  }
}

class Field {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.field = Array(height).fill(null).map(()=>Array(width).fill(null));
  }

  freePlace = () => {
    return this.field.some(sub => sub.some(v => v < 9));
  }
}

export default Engine;