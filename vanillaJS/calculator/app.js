( () => {
  const btns = document.querySelectorAll("button");
  const value = document.getElementById("value");

  const nums = ["0"];
  const operations = [];

  const highlightedBtn = {
    "*": {
      el: document.getElementById("*"),
      isHighighted: false
    },
    "/": {
      el: document.getElementById("/"),
      isHighighted: false
    },
    "+": {
      el: document.getElementById("+"),
      isHighighted: false
    },
    "-": {
      el: document.getElementById("-"),
      isHighighted: false
    }
  }

  updateValue(nums[nums.length - 1]);

  for (let btn of btns) {
    btn.addEventListener("click", (e) => {
      const val = e.target.id;
      handleBtnClick(val);
      changeHighlightedBtn(val);
    });
  }

  function changeHighlightedBtn(val) {
    for (let key in highlightedBtn) {
      const btn = highlightedBtn[key];
      if (key !== val) {
        btn.el.classList.remove("highlighted");
      }
      else if (!btn.isHighighted && key === val) {
        btn.el.classList.add("highlighted");
      }
    }
  }



  function handleBtnClick(val) {
    switch (val) {
      case "reset":
        reset();
        updateValue(nums[nums.length - 1]);
        break;
      case "-/+":
        togglePosNegNum();
        updateValue(nums[nums.length - 1]);
        break;
      case ".":
        addDot();
        updateValue(nums[nums.length - 1]);
        break;
      case "%":
        calcPercent();
        updateValue(nums[nums.length - 1]);
        break;
      case "=":
        calcAll();
        updateValue(nums[nums.length - 1]);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        addOperation(val);
        updateValue(nums[nums.length - 1]);
        break;
      default:
        addNumber(val);
        updateValue(nums[nums.length - 1]);
    }
  }

  function updateValue(txt) {
    value.innerText = txt;
  }

  function reset() {
    nums.length = operations.length = 0;
    nums[0] = "0";
  }

  function addDot() {
    const [num, i] = getLastValAndIndxFromArr(nums);
    nums[i] = num.includes(".") ? num : `${num}.`;
  }

  function calcAll() {
    if (nums.length < 2) return;
    performOperations(["*", "/", "+", "-"]);
  }

  function togglePosNegNum() {
    const [num, i] = getLastValAndIndxFromArr(nums);
    nums[i] = toggleNegativeNum(num);
  }

  function addOperation(operation) {
    if (nums.length === operations.length) {
      operations[operations.length - 1] = operation;
    }
    else {
      calcPreviousOperations(operation);
      operations.push(operation);
    }
  }

  function addNumber(addedNum) {
    if (operations.length === nums.length) {
      nums.push(addedNum);
    }
    else {
      const [num, i] = getLastValAndIndxFromArr(nums);
      nums[i] = num === "0" ? addedNum : `${num}${addedNum}`;
    }
  }

  function calcPercent() {
    const [prevOperation] = getLastValAndIndxFromArr(operations);
    const [num, i] = getLastValAndIndxFromArr(nums);
    const prevNum = nums[i - 1];
    let percent = prevOperation === "+" || prevOperation === "-" ? Number(num) * Number(prevNum) / 100 : Number(num) / 100;
    nums[i] = percent.toString();
  }

  function calcPreviousOperations(newOperation) {
    const [previousOperation] = getLastValAndIndxFromArr(operations);
    if (!previousOperation) return;
    if (newOperation === "+" || newOperation === "-") {
      performOperations(["*", "/", "+", "-"]);
    }
    else if (previousOperation === "*" || previousOperation === "/") {
      performOperations(["*", "/"]);
    }
  }

  function performOperations(operationsToPerform) {
    if (operationsToPerform.length <= 0) return;
    const operation = operationsToPerform[0];
    let indx = operations.indexOf(operation);
    while (indx >= 0) {
      const n1 = Number(nums[indx]),
            n2 = Number(nums[indx + 1]),
            sum = calc(n1, n2, operation);
      operations.splice(indx, 1);
      nums.splice(indx, 2, sum.toString());
      indx = operations.indexOf(operation);
    }
    performOperations(operationsToPerform.slice(1)); 
  }

  function calc(num1, num2, operation) {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  }

  function toggleNegativeNum(num) {
    if (num === "0") return "0";
    return num[0] === "-" ? num.slice(1) : `-${num}`;
  }

  function getLastValAndIndxFromArr(arr) {
    const indx = arr.length - 1;
    const val = arr[indx];
    return [val, indx];
  }

} )();