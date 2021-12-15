import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((e) => e.trim());

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  //console.log(input);
  let counts = input.reduce((p, c) => {
    c.split("").forEach((d, i) => {
      if (d === "1") {
        p[i] += 1;
      } else {
        p[i] -= 1;
      }
    });
    return p;
  }, new Array(input[0].length).fill(0));
  //console.log(counts);
  let rates = counts
    .reduce(
      (p, c) => (c > 0 ? [p[0] + "1", p[1] + "0"] : [p[0] + "0", p[1] + "1"]),
      ["", ""],
    )
    .map((e) => parseInt(e, 2));
  //console.log(rates);
  return rates[0] * rates[1];
};

function highLowBit(list, high, index) {
  var count = 0;
  list.forEach((element) => {
    let bit = element.split("")[index];
    if (bit === "1") {
      count++;
    } else {
      count--;
    }
  });

  if (count > 0) {
    return high ? 1 : 0;
  } else if (count < 0) {
    return high ? 0 : 1;
  } else {
    return high ? 1 : 0;
  }
}

const part2 = (rawInput) => {
  var oxygenRating = parseInput(rawInput);
  const strLen = oxygenRating[0].length;

  for (var i = 0; i < strLen; i++) {
    let lcb = highLowBit(oxygenRating, false, i);

    oxygenRating = oxygenRating.filter((e) => {
      let val = parseInt(e[i]);
      return val === lcb;
    });

    if (oxygenRating.length <= 1) {
      break;
    }
  }

  var carbonRating = parseInput(rawInput);
  for (var i = 0; i < strLen; i++) {
    let mcb = highLowBit(carbonRating, true, i);

    carbonRating = carbonRating.filter((e) => {
      let val = parseInt(e[i]);
      return val === mcb;
    });

    if (carbonRating.length <= 1) {
      break;
    }
  }

  return parseInt(oxygenRating[0], 2) * parseInt(carbonRating[0], 2);
};

run({
  part1: {
    tests: [
      {
        input: `00100
       11110
       10110
       10111
       10101
       01111
       00111
       11100
       10000
       11001
       00010
       01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
       11110
       10110
       10111
       10101
       01111
       00111
       11100
       10000
       11001
       00010
       01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
