import React, { useRef } from 'react';
import QUESTIONS from '../questions.js';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();
  
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
    return (
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          let cssClass = '';
          const isSelected = selectedAnswer === answer;
          if (answerState === 'answered' && isSelected) {
            cssClass = 'selected';
          } else if (answerState === 'wrong' && isSelected) {
            cssClass = 'wrong';
          } else if (answerState === 'correct' && isSelected) {
            cssClass = 'correct';
          }

          return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
          );
        })
        }
      </ul>
    )
}