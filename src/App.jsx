import { useState } from "react";
import Display from "./components/Display";
import styles from "./styles/App.module.scss";
import Button from "./components/Button";

function App() {
  const [total, setTotal] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousTotal, setPreviousTotal] = useState(null);
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [addend, setAddend] = useState(null);

  const handleNumberClick = (number) => {
    if (isNewNumber) {
      setTotal(number);
      setIsNewNumber(false);
    } else {
      setTotal(total + number);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    setOperator(nextOperator);
    setAddend(null);
    if (!isNewNumber) {
      setPreviousTotal(total);
      setIsNewNumber(true);
      if (previousTotal) {
        const newTotal = calculate();
        setPreviousTotal(newTotal);
        setTotal(newTotal);
      }
    }
  };

  const calculate = (b = Number(total)) => {
    if (previousTotal && operator) {
      let a = Number(previousTotal);
      let t;

      switch (operator) {
        case "+":
          t = a + b;
          break;
        case "-":
          t = a - b;
          break;
        case "*":
          t = a * b;
          break;
        case "/":
          t = a / b;
          break;
        default:
          t = total;
          break;
      }

      console.log(a, operator, b, "=", t);
      return t;
    }
  };

  const buttons = [
    {
      type: "utility",
      text: "AC",
      ariaLabel: "all clear",
      onClick: () => {
        setTotal(0);
        setOperator(null);
        setIsNewNumber(true);
        setPreviousTotal(null);
        setAddend(null);
      },
    },
    { type: "utility", text: "±", onClick: () => setTotal(-total) },
    { type: "utility", text: "%", onClick: () => setTotal(total / 100) },
    {
      type: "operator",
      text: "÷",
      operator: "/",
      onClick: () => {
        handleOperatorClick("/");
      },
    },
    {
      type: "number",
      text: "1",
      onClick: () => {
        handleNumberClick("1");
      },
    },
    {
      type: "number",
      text: "2",
      onClick: () => {
        handleNumberClick("2");
      },
    },
    {
      type: "number",
      text: "3",
      onClick: () => {
        handleNumberClick("3");
      },
    },
    {
      type: "operator",
      text: "x",
      operator: "*",
      ariaLabel: "multiply",
      onClick: () => {
        handleOperatorClick("*");
      },
    },
    {
      type: "number",
      text: "4",
      onClick: () => {
        handleNumberClick("4");
      },
    },
    {
      type: "number",
      text: "5",
      onClick: () => {
        handleNumberClick("5");
      },
    },
    {
      type: "number",
      text: "6",
      onClick: () => {
        handleNumberClick("6");
      },
    },
    {
      type: "operator",
      text: "-",
      ariaLabel: "minus",
      onClick: () => {
        handleOperatorClick("-");
      },
    },
    {
      type: "number",
      text: "7",
      onClick: () => {
        handleNumberClick("7");
      },
    },
    {
      type: "number",
      text: "8",
      onClick: () => {
        handleNumberClick("8");
      },
    },
    {
      type: "number",
      text: "9",
      onClick: () => {
        handleNumberClick("9");
      },
    },
    {
      type: "operator",
      text: "+",
      onClick: () => {
        handleOperatorClick("+");
      },
    },
    {
      type: "number",
      text: "0",
      isDoubleWide: true,
      onClick: () => {
        handleNumberClick("0");
      },
    },
    {
      type: "number",
      text: ".",
      ariaLabel: "decimal",
      onClick: () => {
        if (!total.toString().includes(".")) {
          setTotal(total + ".");
        }
      },
    },
    {
      type: "operator",
      text: "=",
      operator: "Enter",
      onClick: () => {
        setIsNewNumber(true);
        if (!addend) {
          setAddend(total);
          setTotal(calculate());
          setPreviousTotal(calculate());
        } else {
          const numAddend = Number(addend);
          setPreviousTotal(calculate(numAddend));
          setTotal(calculate(numAddend));
        }
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Display value={total ?? "0"} />
        {buttons.map((button, index) => (
          <Button
            key={button.text + index}
            {...button}
            hotkey={button.operator ?? button.text}
            isActive={operator === button.text || operator === button.operator}
            ariaLabel={button.ariaLabel ?? button.text}
          >
            {button.text}
          </Button>
        ))}
      </main>
    </div>
  );
}

export default App;
