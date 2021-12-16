import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split("").map((c) => parseInt(c)));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const lowPoint = (input, i, j) => {
    const val = input[i][j];

    const up = i === 0 ? val + 1 : input[i - 1][j];
    const down = i === input.length - 1 ? val + 1 : input[i + 1][j];
    const left = j === 0 ? val + 1 : input[i][j - 1];
    const right = j === input[i].length - 1 ? val + 1 : input[i][j + 1];

    return val < up && val < down && val < right && val < left;
  };

  const lowPoints = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (let j = 0; j < line.length; j++) {
      if (lowPoint(input, i, j)) {
        //console.log(i, j);
        lowPoints.push(input[i][j]);
      }
    }
  }
  // console.log(lowPoints);
  return lowPoints.reduce((out, val) => out + val + 1, 0);
};

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);

  const lowPoint = (input, i, j) => {
    const val = input[i][j];

    const up = i === 0 ? val + 1 : input[i - 1][j];
    const down = i === input.length - 1 ? val + 1 : input[i + 1][j];
    const left = j === 0 ? val + 1 : input[i][j - 1];
    const right = j === input[i].length - 1 ? val + 1 : input[i][j + 1];

    return val < up && val < down && val < right && val < left;
  };

  const lowPoints = [];
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (lowPoint(grid, i, j)) {
        lowPoints.push([i, j]);
      }
    }
  }

  const getBasin = (inGrid, x, y) => {
    const grid = [...inGrid];
    const width = grid[0].length;
    const height = grid.length;
    const basin = [];
    const queue = [[x, y]];
    while (queue.length > 0) {
      const point = queue.pop();
      const i = point[0];
      const j = point[1];
      if (
        i < 0 ||
        i >= height ||
        j < 0 ||
        j >= width ||
        grid[i][j] === 9 ||
        grid[i][j] === -1
      ) {
        continue;
      } else {
        grid[i][j] = -1;
        basin.push([i, j]);
        queue.push([i - 1, j]);
        queue.push([i + 1, j]);
        queue.push([i, j - 1]);
        queue.push([i, j + 1]);
      }
    }

    return basin;
  };

  return lowPoints
    .map(([i, j]) => getBasin(grid, i, j).length)
    .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))
    .slice(0, 3)
    .reduce((out, val) => out * val);
};

run({
  part1: {
    tests: [
      {
        input: `
        2199943210
        3987894921
        9856789892
        8767896789
        9899965678
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2199943210
        3987894921
        9856789892
        8767896789
        9899965678
        `,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
