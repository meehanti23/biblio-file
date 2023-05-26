import React, { useState, useEffect } from "react";

const TriviaTile = ({ index, question, answerReveal, correctAnswer, incorrectAnswers, selectedAnswer, onAnswerChange }) => {
  const decodedQuestion = decodeEntities(question);
  const decodedCorrectAnswer = decodeEntities(correctAnswer);
  const incorrectList = incorrectAnswers.map(answer => decodeEntities(answer));
  const [shuffledAnswerList, setShuffledAnswerList] = useState([])

  useEffect(() => {
    setShuffledAnswerList([...incorrectList, decodedCorrectAnswer].sort(() => Math.random() - 0.5));
  }, []);
  
  const handleAnswerChange = (event) => {
    const answer = event.target.value;
    onAnswerChange(index, answer);
  };

  let showAnswer
  if (answerReveal) {
    showAnswer = <p className="answer">The correct answer is: {decodedCorrectAnswer}</p>
  }

  return (
    <div className="review-tile">
      <h3 dangerouslySetInnerHTML={{ __html: decodedQuestion }} />
      {shuffledAnswerList.map((answer, answerIndex) => (
        <div key={answerIndex}>
          <input
            type="radio"
            id={index + "-" + answerIndex}
            name={"answer-" + index}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={handleAnswerChange}
          />
          <label className="multiple-choice" htmlFor={index + "-" + answerIndex}>{answer}</label>
        </div>
      ))}
      {showAnswer}
    </div>
  );
};

const decodeEntities = (encodedString) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
};

export default TriviaTile;