import { Answer } from "./components/Answer";
import questions from "./questions.json";
import windAudio from "./assets/audios/criancas-comemorando.mp3";
import looseAudio from "./assets/audios/loose-audio.mp3";
import trollface from "./assets/images/trollface.png";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const winAnswerAudio = new Audio(windAudio);
const looseAnswerAudio = new Audio(looseAudio);

export function App() {
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [ gameIsStarted, setGameIsStarted ] = useState(false);
    const [ isWinned, setIsWinned ] = useState(false);
    const [ lifes, setLifes ] = useState(3);
    const trollfaces : { id: string, image: string }[] = [];

    for (let i = 0; i < lifes; i ++) {
        trollfaces.push({ id: crypto.randomUUID(), image: trollface });
    }

    useEffect(() => {
        if (lifes === 3) return;
        if (lifes === 0) {
                setGameIsStarted(false);  
                looseAnswerAudio.play();
            }
    }, [lifes]);

    
  
    function handleStartGame() {
        setGameIsStarted(true);
        
    }
    async function handleClickAnswer(value: number) {
        if (value === currentQuestion.correntAnswer) {
            if (currentQuestionIndex === questions.length - 1) {
                setIsWinned(true);
                setGameIsStarted(false);
                winAnswerAudio.play();
            }
            else {
                nextQuestion();
            }
            
        }
        else {
            setLifes(prevLifes => prevLifes - 1);
            
        }
    }
    function nextQuestion() {
        setCurrentQuestionIndex(prevValue => prevValue + 1);
    }

    function stopAudio(audio: HTMLAudioElement) {
        audio.pause();
        audio.currentTime = 0;
    }

    function handleResetGame() {
        setIsWinned(false);
        setCurrentQuestionIndex(0);
        setLifes(3);
        setGameIsStarted(true);
        stopAudio(looseAnswerAudio);
        stopAudio(winAnswerAudio);
    }
    return (
        <div className="flex 
        flex-col justify-center
        items-center gap-8 h-screen w-full">
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
                    <div className="absolute grid grid-cols-1 top-0 right-0
                    pr-4 gap-2 pt-4 md:grid-cols-3">
                        { trollfaces.map(trollface => (
                            <img src={trollface.image} key={trollface.id}
                            className="size-8"/>
                        )) }
                    </div>
                    <div className="absolute top-0 
                    left-0 bg-black text-white ml-2 mt-2
                    size-14 rounded-full text-2xl
                    flex items-center justify-center
                    cursor-default
                    ">
                        <span>{currentQuestion.id}</span>
                    </div>
                    <img className="mb-14 w-56 h-56 bg-gray-600" src={currentQuestion.image}/>
                    
                    <div className="grid gap-x-8 gap-y-4 
                    grid-cols-2 md:grid-cols-3 ">
                        { currentQuestion.answers.map(answer => (
                            <Answer
                            key={answer.id}
                            onClick={handleClickAnswer}
                            value={answer.value}/>
                        )) }
                    </div>
               </div>
            )}
            <footer className="flex absolute bottom-0 items-center
            w-full justify-evenly md:justify-between p-2 md:p-4">
                <div className=" 
                 text-white
                 w-56 text-2xl cursor-default
                 flex gap-4 mobile:ml-4">
                    <a href="https://github.com/fernandobarrosd">
                        <BsGithub className="size-5 md:size-6" color="#000000"/>
                    </a>
                    <a href="https://www.linkedin.com/in/fernando-de-barros-204864241">
                        <BsLinkedin  className="size-5 md:size-6" color="#000000"/>
                    </a>
                    <a href="https://twitter.com/fbarrosdev">
                        <BsTwitter  className="size-5 md:size-6" color="#000000"/>
                    </a>
                 </div>
                <span className="text-xs md:text-sm mobile:mr-4 mobile:text-center">
                    Created by Fernando de Barros
                </span>
            </footer>
        </div>
      );
}