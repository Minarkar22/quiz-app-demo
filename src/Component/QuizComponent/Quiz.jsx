import React, { useEffect, useRef, useState } from 'react'
import "./Quiz.css";
import {data} from "../../assets/data.js";
const Quiz = () => {
  
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option_1 = useRef(null);
    let option_2 = useRef(null);
    let option_3 = useRef(null);
    let option_4 = useRef(null);

    let option_array = [option_1, option_2, option_3, option_4];

    useEffect(() => {
        setQuestion(data[index]);
    }, [index]);

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

    const NextButton = () => {
        if (lock === true){
            if(index === data.length - 1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return(null);
            });
        };
    };

    const ResetButton = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {
            result ? <></> : 
            <>
                <p>{index + 1}. {question.question}</p>
                <ul>
                    <li ref={option_1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                    <li ref={option_2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                    <li ref={option_3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                    <li ref={option_4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
                </ul>
                <button onClick={NextButton}>Next</button>
                <div className="index">{index + 1} of {data.length} questions</div>
            </>
        }
        {
            result ? <><p>You scored {score} out of {data.length}</p>
                        <button onClick={ResetButton}>Reset</button></> : <></>
        }
        
        
    </div>
  )
}

export default Quiz