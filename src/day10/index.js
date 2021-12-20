import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  //console.log(input);
  const brackets = new Map();
  brackets.set("(", ")");
  brackets.set("[", "]");
  brackets.set("{", "}");
  brackets.set("<", ">");

  const scores = new Map();
  scores.set(")", 3);
  scores.set("]", 57);
  scores.set("}", 1197);
  scores.set(">", 25137);

  const lefts = [];

  const out = input.map((line) => {
    let score = 0;
    for (let i = 0; i < line.length; i++) {
      const val = line[i];
      if ([...brackets.keys()].includes(val)) {
        lefts.push(val);
      } else {
        const left = lefts.pop();
        if (val !== brackets.get(left)) {
          score = scores.get(val);
          break;
        }
      }
    }
    return score;
  });

  return out.reduce((p, c) => p + c);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const brackets = new Map();
  brackets.set("(", ")");
  brackets.set("[", "]");
  brackets.set("{", "}");
  brackets.set("<", ">");

  const scoreMap = new Map();
  scoreMap.set("(", 1);
  scoreMap.set("[", 2);
  scoreMap.set("{", 3);
  scoreMap.set("<", 4);

  const remaining = input
    .map((line) => {
      const lefts = [];
      for (let i = 0; i < line.length; i++) {
        const val = line[i];
        if ([...brackets.keys()].includes(val)) {
          lefts.push(val);
        } else {
          const left = lefts.pop();
          if (val !== brackets.get(left)) {
            return [];
          }
        }
      }
      return lefts;
    })
    .filter((lefts) => lefts.length > 0);

  const scores = remaining
    .map((remaining) =>
      remaining.reverse().reduce((score, unclosed) => {
        score = score * 5;
        score = score + scoreMap.get(unclosed);
        return score;
      }, 0),
    )
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  return scores[(scores.length - 1) / 2];
};

run({
  part1: {
    tests: [
      {
        input: `
          [({(<(())[]>[[{[]{<()<>>
          [(()[<>])]({[<{<<[]>>(
          {([(<{}[<>[]}>{[]{[(<()>
          (((({<>}<{<{<>}{[]{[]{}
          [[<[([]))<([[{}[[()]]]
          [{[{({}]{}}([{[{{{}}([]
          {<[[]]>}<{[{[{[]{()[[[]
          [<(<(<(<{}))><([]([]()
          <{([([[(<>()){}]>(<<{{
          <{([{{}}[<[[[<>{}]]]>[]]
          `,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            [({(<(())[]>[[{[]{<()<>>
            [(()[<>])]({[<{<<[]>>(
            {([(<{}[<>[]}>{[]{[(<()>
            (((({<>}<{<{<>}{[]{[]{}
            [[<[([]))<([[{}[[()]]]
            [{[{({}]{}}([{[{{{}}([]
            {<[[]]>}<{[{[{[]{()[[[]
            [<(<(<(<{}))><([]([]()
            <{([([[(<>()){}]>(<<{{
            <{([{{}}[<[[[<>{}]]]>[]]
            `,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
