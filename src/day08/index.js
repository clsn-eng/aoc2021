import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(" | ")[1].split(" "));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const uniqueDigits = input.map((output) =>
    output.filter((digits) => [2, 3, 4, 7].includes(digits.length)),
  );
  return uniqueDigits.reduce((out, digits) => out + digits.length, 0);
};

const parseInput2 = (rawInput) => {
  const lines = rawInput.split("\n");
  return lines.map((line) =>
    line.split(" | ").map((digits) => digits.split(" ")),
  );
};

const part2 = (rawInput) => {
  const input = parseInput2(rawInput);

  let sum = 0;
  for (let line of input) {
    const obs = line[0];

    const segments = findSegments(obs);
    const decoding = decodeSegments(segments);

    const convertNumericForCoding = (digits) =>
      convertNumeric(decoding, digits);

    const output = line[1];
    const outputNumeric = output.map((digits) =>
      convertNumericForCoding(digits),
    );
    sum += parseInt("".concat(...outputNumeric));
  }

  return sum;
};

function subtract(xDigits, yDigits) {
  return "".concat(...[...xDigits].filter((digit) => !yDigits.includes(digit)));
}

function equals(xDigits, yDigits) {
  return subtract(xDigits, yDigits) === subtract(yDigits, xDigits);
}

function findSegments(obs) {
  let [A, B, C, D, E, F, G] = new Array(7).fill("?");

  const oneDigits = obs.filter((digits) => digits.length === 2)[0];
  const sevenDigits = obs.filter((digits) => digits.length === 3)[0];
  const fourDigits = obs.filter((digits) => digits.length === 4)[0];

  A = subtract(sevenDigits, oneDigits);

  for (let letter of "abcdefg") {
    const letterCount = obs.filter((ob) => [...ob].includes(letter)).length;
    if (letterCount === 4) {
      E = letter;
    } else if (letterCount === 6) {
      B = letter;
    } else if (letterCount === 9) {
      F = letter;
    }
  }

  C = subtract(oneDigits, F);
  D = subtract(fourDigits, B.concat(C, F));
  G = subtract("abcdefg", A.concat(B, C, D, E, F));

  return [A, B, C, D, E, F, G];
}

function decodeSegments(segments) {
  const [A, B, C, D, E, F, G] = [...segments];
  const zero = "".concat(A, B, C, E, F, G);
  const one = "".concat(C, F);
  const two = "".concat(A, C, D, E, G);
  const three = "".concat(A, C, D, F, G);
  const four = "".concat(B, C, D, F);
  const five = "".concat(A, B, D, F, G);
  const six = "".concat(A, B, D, E, F, G);
  const seven = "".concat(A, C, F);
  const eight = "".concat(A, B, C, D, E, F, G);
  const nine = "".concat(A, B, C, D, F, G);
  return [zero, one, two, three, four, five, six, seven, eight, nine];
}

function convertNumeric(decoding, digits) {
  for (let i = 0; i < decoding.length; i++) {
    const code = decoding[i];
    if (equals(code, digits)) {
      return i;
    }
  }
  return -1;
}

run({
  part1: {
    tests: [
      {
        input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
        `,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
        `,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
