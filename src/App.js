import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const calculateWordCount = (text) => {
    const wordsArr = text.trim().split(" ");
    const filteredWords = wordsArr.filter((word) => {
      return word !== "";
    });
    console.log(filteredWords.length);
    return filteredWords.length;
  };
  const startClock = () => {
    setText("");
    setIsTimeRunning(true);
    setTimeRemaining(5);
    setWordCount(0);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };
  const endGame = () => {
    setWordCount(calculateWordCount(text));
    setIsTimeRunning(false);
  };
  useEffect(() => {
    if (timeRemaining > 0 && isTimeRunning) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);
  console.log(isTimeRunning);
  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        disabled={!isTimeRunning}
        value={text}
        onChange={handleChange}
        ref={inputRef}
      ></textarea>
      <h4>Time remaining: {timeRemaining}</h4>
      <button disabled={isTimeRunning} onClick={startClock}>
        Start{" "}
      </button>

      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
