import React, { useState } from "react";

const TriviaTile = ({ question, correctAnswer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const decodedQuestion = decodeEntities(question);
    const decodedCorrectAnswer = decodeEntities(correctAnswer);

    let answer
    if (showAnswer) {
        answer = (
            <h5 dangerouslySetInnerHTML={{ __html: decodedCorrectAnswer }} />
        );
    }

    const handleToggleAnswer = () => {
        setShowAnswer(!showAnswer)
    }

    return (
        <div className="review-tile">
            <h3 dangerouslySetInnerHTML={{ __html: decodedQuestion }} />
            <button className="show-answer" onClick={handleToggleAnswer}>Show Answer</button>
            {answer}
        </div>
    )
}

const decodeEntities = (encodedString) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = encodedString;
    return textArea.value;
};

export default TriviaTile;