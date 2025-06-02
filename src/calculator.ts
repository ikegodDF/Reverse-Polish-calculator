export const calculate = (input: string): number | Error => {
  console.log(input);
  const list =
    input
      .match(/\d+|\+|-|\*|\//g)
      ?.map(num => (isNaN(Number(num)) ? num : Number(num))) ?? [];
  const stack: number[] = [];
  for (const num of list) {
    if (typeof num === "number") {
      if (num % 1 !== 0) {
        return Error("少数は含めません");
      }
      stack.push(num);
      continue;
    }
    switch (num) {
      case "+": {
        const right = stack.pop();
        const left = stack.pop();
        if (typeof left === "undefined" || typeof right === "undefined") {
          return Error("構文エラー");
        }
        const result = left + right;
        stack.push(result);
        break;
      }
      case "-": {
        const right = stack.pop();
        const left = stack.pop();
        if (typeof left === "undefined" || typeof right === "undefined") {
          return Error("構文エラー");
        }
        const result = left - right;
        stack.push(result);
        break;
      }
      case "*": {
        const right = stack.pop();
        const left = stack.pop();
        if (typeof left === "undefined" || typeof right === "undefined") {
          return Error("構文エラー");
        }
        const result = left * right;
        stack.push(result);
        break;
      }
      case "/": {
        const right = stack.pop();
        const left = stack.pop();
        if (typeof left === "undefined" || typeof right === "undefined") {
          return Error("構文エラー");
        }
        if (right === 0) {
          return Error("ゼロ除算はできません");
        }
        const result = Math.trunc(left / right);
        stack.push(result);
        break;
      }
      default:
        return Error(`${num}は許可されてない文字です`);
    }
  }

  if (stack.length !== 1) {
    return Error(`構文エラー`);
  }
  const num: number = stack[0];
  return num;
};
