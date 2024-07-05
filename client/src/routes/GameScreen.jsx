import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ServerApi from '../api/ServerApi';
import { Button, Input } from '@nextui-org/react';
import { BsDatabaseAdd } from 'react-icons/bs';

export default function GameScreen() {
    const [data, setData] = useState(null)
    const [points, setPoints] = useState(0)
    const [round, setRound] = useState(0)
    const [finish, setFinish] = useState(false)
    const [answer, setAnswer] = useState(null)
    let { gameType, category } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let serverData = await ServerApi.getData()
            let words = (category == "allin") ? serverData.language.english.words : serverData.language.english.words.filter((e) => e.category == category)
            console.log(words.length)
            let questions = []
            if (gameType == 1) { // quiz abcd


                let existingGoodAnswers = []
                for (let i = 0; i < 10; i++) {
                    let wordsToAnswer = []
                    wordsToAnswer.push(words[Math.floor(Math.random() * words.length)])
                    wordsToAnswer.push(words[Math.floor(Math.random() * words.length)])
                    wordsToAnswer.push(words[Math.floor(Math.random() * words.length)])
                    wordsToAnswer.push(words[Math.floor(Math.random() * words.length)])
                    // wordsToAnswer.push(getRandomWord(wordsToAnswer, words))
                    // wordsToAnswer.push(getRandomWord(wordsToAnswer, words))
                    // wordsToAnswer.push(getRandomWord(wordsToAnswer, words))
                    // wordsToAnswer.push(getRandomWord(wordsToAnswer, words))
                    let goodAnswer = Math.floor(Math.random() * 4);
                    existingGoodAnswers.push(wordsToAnswer[goodAnswer])
                    let question = {goodAnswer: wordsToAnswer[goodAnswer], questions: wordsToAnswer}

                    questions.push(question)
                }
            } else if (gameType == 2) { // quiz słowa

                for (let i = 0; i < 10; i++) {

                    let randomWord = words[Math.floor(Math.random() * words.length)]
                    questions.push(randomWord)
                }

            }
            setData(questions)


        }
        fetchData()

    }, [])
    return (
        <div className='p-20 flex flex-col items-center size-full'>

            { finish == false ?
            <>
            <p className='text-primary-foreground'>Runda: {round+1}/10</p>
            <p className='text-primary-foreground'>Punkty: {points}</p>
            {
                gameType == 1
                    ?
                    <div className='flex flex-col gap-4 items-center w-3/5'>
                        <div><p className='font-roboto-bold text-5xl text-primary-foreground p-5'>{data?.[round].goodAnswer.original}</p></div>
                        <div><p className='text-primary-foreground'>{"[typ: " + data?.[round].goodAnswer.type + "] [kat: " +  data?.[round].goodAnswer.category + "]"}</p></div>
                        <div className='flex flex-row gap-8'>
                        {
                            data?.[round].questions.map((e) => <Button onClick={() => {
                                if(e.translation == data?.[round].goodAnswer.translation){
                                    setPoints(points + 1)
                                } else {
                                    alert("Błąd ! Poprawna odpowiedź to: " + data?.[round].goodAnswer.translation)
                                }
                                if(round == 9){
                                    setFinish(true)
                                } else {
                                    setRound(round+1)
                                }

                            }}>{e.translation}</Button>)
                        }
                        </div>
                    </div>
                    :
                    <div className='flex flex-col gap-4 items-center w-3/5'>
                        <div><p className='font-roboto-bold text-5xl text-primary-foreground p-5'>{data?.[round].original}</p></div>
                        <div><p className='text-primary-foreground'>{"[typ: " + data?.[round].type + "] [kat: " +  data?.[round].category + "]"}</p></div>
                        <div><Input value={answer} onValueChange={(s) => {setAnswer(s)}}/></div>
                        <Button onClick={() => {
                            if(answer.toLocaleLowerCase()==data?.[round].translation.toLocaleLowerCase()){
                                setPoints(points + 1)
                            } else {
                                alert("Bład! Poprawna odpowiedź, to: " + data?.[round].translation)
                            }
                            setAnswer("")
                            if(round == 9){
                                setFinish(true)
                            } else {
                                setRound(round+1)
                            }

                        }}>Zatwierdź</Button>

                    </div>
            }</>
            :
            <>
                <div className='flex flex-col gap-4 justify-center items-center w-3/5'>
                <p className='font-roboto-bold text-5xl text-primary-foreground p-5'>Koniec</p>
                    <p>Twój wynik to: {points}/10</p>
                </div>
            </>
        }

        </div>
    )
}


function getRandomWord(existingWords, data){
    let randomWord = data[Math.floor(Math.random() * data.length)]
    while(existingWords.some(function(element) {
        return element.original === randomWord.original;
    })){
        randomWord = data[Math.floor(Math.random() * data.length)]
    }
    return randomWord
}
