import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TriviaTile from './TriviaTile';

const BookTrivia = () => {
  const [triviaData, setTriviaData] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const fetchTriviaData = async () => {
    try {
      const response = await axios.get(`/api/v1/trivia?amount=${encodeURIComponent(numQuestions)}`);
      setTriviaData(response.data);
      setSelectedAnswers(new Array(response.data.length).fill(null));
      setScore(null);
    } catch (error) {
      console.error('Error fetching trivia:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchTriviaData()
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);
  };

  const handleAnswerChange = (index, answer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = answer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const calculateScore = () => {
    const calculatedScore = selectedAnswers.reduce((acc, selectedAnswer, index) => {
      const trivia = triviaData[index];
      if (selectedAnswer === trivia.correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(calculatedScore);
  };

  const triviaList = triviaData.map((trivia, index) => (
    <TriviaTile
      key={index}
      index={index}
      question={trivia.question}
      correctAnswer={trivia.correct_answer}
      incorrectAnswers={trivia.incorrect_answers}
      selectedAnswer={selectedAnswers[index]}
      onAnswerChange={handleAnswerChange}
    />
  ));

  let calculateScoreButton
  if (selectedAnswers.includes(null) || triviaData.length === 0) {
    calculateScoreButton = ''
  } else {
    calculateScoreButton = (
      <div className='score-button'>
        <button className='calculate-score' onClick={calculateScore}>
          Calculate Score
        </button>
      </div>
    )
  }

  return (
    <div className='trivia-block'>
      <h1 className='page-title'>Book Trivia</h1>
      <form onSubmit={handleFormSubmit}>
        <label className='num-quest'>
          Number of Questions:
          <input
            type="range"
            min={5}
            max={30}
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            className="num-slider"
          />
          <span>{numQuestions}</span>
        </label>
        <div className='trivia-button'>
          <button className="triva-button" type="submit">Get Trivia</button>
        </div>
      </form>
      <ul className='trivia-list'>{triviaList}</ul>
        {calculateScoreButton}
      {score !== null && (
        <div>
          <h3 className="score">Your Score: {score}/{triviaData.length}</h3>
        </div>
      )}
    </div>
  );
};

export default BookTrivia;
