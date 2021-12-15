import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((s) => parseInt(s));

const part1 = (rawInput) => {
  let increases = 0;
  const input = parseInput(rawInput);
  for (let i = 1; i < input.length; i++) {
    increases = input[i] > input[i - 1] ? increases + 1 : increases;
  }
  return increases;
};

const part2 = (rawInput) => {
  let increases = 0;
  const input = parseInput(rawInput);
  for (let i = 1; i < input.length - 2; i++) {
    const window1 = input[i - 1] + input[i] + input[i + 1];
    const window2 = input[i] + input[i + 1] + input[i + 2];
    increases = window2 > window1 ? increases + 1 : increases;
  }
  return increases;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
        200
        208
        210
        200
        207
        240
        269
        260
        263`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
