import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",").map((v) => parseInt(v));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  console.log(input);

  const test = (x) => {
    return input.reduce((out, pos) => {
      return out + Math.abs(pos - x);
    }, 0);
  };
  let min = [0, test(0)];
  const max = Math.max(...input);
  console.log(max);
  for (let i = 1; i < max; i++) {
    const fuel = test(i);
    min = fuel < min[1] ? [i, fuel] : min;
  }

  return min[1];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const triangle = (n) => {
    return n === 0 ? 0 : n + triangle(n - 1);
  };

  const test = (x) => {
    return input.reduce((out, pos) => {
      return out + triangle(Math.abs(pos - x));
    }, 0);
  };

  let min = [0, test(0)];
  const max = Math.max(...input);
  for (let i = 1; i < max; i++) {
    const fuel = test(i);
    min = fuel < min[1] ? [i, fuel] : min;
  }

  return min[1];
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
