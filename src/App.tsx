import { Answer } from "./components/Answer";
import questions from "./questions.json";
import incorrectAudio from "./assets/audios/faustao-errou.mp3";
import correctAudio from "./assets/audios/faustao-acertou.mp3";
import windAudio from "./assets/audios/criancas-comemorando.mp3";
import looseAudio from "./assets/audios/loose-audio.mp3";
import trollface from "./assets/images/trollface.png";
import { useCallback, useEffect, useState } from "react";

const correctAnswerAudio = new Audio(correctAudio);
const incorrectAnswerAudio = new Audio(incorrectAudio);
const winAnswerAudio = new Audio(windAudio);
const looseAnswerAudio = new Audio(looseAudio);

export function App() {
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [ gameIsStarted, setGameIsStarted ] = useState(false);
    const [ isWinned, setIsWinned ] = useState(false);
    const [ lifes, setLifes ] = useState(5);
    const trollfaces : { id: number, image: string }[] = [];

    for (let i = 0; i < lifes; i ++) {
        trollfaces.push({ id: i + 1, image: trollface });
    }


    function handleStartGame() {
        setGameIsStarted(true);
    }
    async function handleClickAnswer(value: number) {
        if (value === currentQuestion.correntAnswer) {
            if (currentQuestionIndex === questions.length - 1) {
                setIsWinned(true);
                winAnswerAudio.play();
            }
            else {
                nextQuestion();
                correctAnswerAudio.play();
            }
            
        }
        else {
            setLifes(prevLifes => prevLifes - 1);
            incorrectAnswerAudio.play();
            
        }
    }
    function nextQuestion() {
        setCurrentQuestionIndex(prevValue => prevValue + 1);
    }

    function handleResetGame() {
        setIsWinned(false);
        setCurrentQuestionIndex(0);
        setLifes(5);
        setGameIsStarted(true);
    }
    return (
        <div className="flex 
        flex-col justify-center 
        items-center gap-8 h-screen w-full
        relative">
            { !gameIsStarted ? (
                <>
                    <h1 className="text-2xl">
                        { isWinned ? "You winn" : lifes === 0 ? 
                        "You loose" : "Game Quiz" }
                    </h1>
                    <button
                    onClick={isWinned ? handleResetGame :
                        lifes === 0 ? handleResetGame :handleStartGame}
                    className="bg-black text-white p-2.5 rounded-sm">
                        {isWinned ? "Reset Game" : lifes === 0 ? 
                        "Reset Game" : "Start Game"}
                    </button>
                </>  
            ) : (
               <div className="flex flex-col items-center">
                    <div className="absolute grid grid-cols-5 top-4 right-4
                    gap-2">
                        { trollfaces.map(trollface => (
                            <img src={trollface.image} key={trollface.id}
                            className="size-10"/>
                        )) }
                    </div>
                    <img className="mb-14" src={currentQuestion.image} width={200}/>
                    
                    <ul className="grid 
                    gap-x-8 gap-y-4 
                    grid-cols-3">
                        { currentQuestion.answers.map(answer => (
                            <Answer
                            key={answer.id}
                            onClick={handleClickAnswer}
                            value={answer.value}/>
                        )) }
                    </ul>
               </div>
            )}
        </div>
      );
}