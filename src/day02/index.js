import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((e) => e.trim());

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let hPos = input
    .filter((e) => /^f/.test(e))
    .map((e) => parseInt(e.split(" ")[1]))
    .reduce((p, c) => p + c);
  console.log(hPos);

  let vPos = input
    .filter((e) => /^[ud]/.test(e))
    .map((e) => parseInt(e.split(" ")[1]) * (e.split(" ")[0] === "up" ? -1 : 1))
    .reduce((p, c) => p + c, 0);
  console.log(vPos);
  return hPos * vPos;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let hPos = 0;
  let vPos = 0;
  let aim = 0;
  input.forEach((e) => {
    let [cmd, val] = e.split(" ");
    val = parseInt(val);
    if (cmd === "forward") {
      hPos += val;
      vPos += val * aim;
    } else if (cmd === "up") {
      aim += -val;
    } else if (cmd === "down") {
      aim += val;
    }
  });
  return hPos * vPos;
};

run({
  part1: {
    tests: [
      {
        input: `forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5
       down 5
       forward 8
       up 3
       down 8
       forward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
