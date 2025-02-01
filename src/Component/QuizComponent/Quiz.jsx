import React, { useRef, useState } from 'react'
import "./Quiz.css";
import {data} from "../../assets/data.js";
const Quiz = () => {
  
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);

    let option_1 = useRef(null);
    let option_2 = useRef(null);
    let option_3 = useRef(null);
    let option_4 = useRef(null);

    let option_array = [option_1, option_2, option_3, option_4];

    const checkAns = (e,ans) => {
        if(lock===false){
            if(question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>(prev+1));
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
        
    }

    return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        <p>{index + 1}. {question.question}</p>
        <ul>
            <li ref={option_1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={option_2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={option_3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={option_4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button>Next</button>
        <div className="index">{index + 1} of {data.length} questions</div>
    </div>
  )
}

export default Quiz