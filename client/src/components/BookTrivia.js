import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TriviaTile from './TriviaTile';

const BookTrivia = () => {
  const [triviaData, setTriviaData] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);

  const fetchTriviaData = async () => {
    try {
      const response = await axios.get(`/api/v1/trivia?amount=${encodeURIComponent(numQuestions)}`, {
      });
      setTriviaData(response.data);
    } catch (error) {
      console.error('Error fetching trivia:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchTriviaData();
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);
  };

  const triviaList = triviaData.map((trivia, index) => {
    return (
        <TriviaTile
            key={index}
            question={trivia.question}
            correctAnswer={trivia.correct_answer}
        />
    )
    });

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
    </div>
  );
};

export default BookTrivia;
