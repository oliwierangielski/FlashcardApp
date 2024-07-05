
import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { BsPieChart } from "react-icons/bs";
import { TbAbc } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { BsQuestionSquare } from "react-icons/bs";

export default function NavigationBar() {
    return (
        <div className="bg-secondary-background flex flex-col gap-11 justify-center text-secondary-foreground items-center">
            <a href="/proxy/3000/home">
                <div className='flex flex-col justify-center text-center'>
                    <div className='flex justify-center'><AiOutlineHome size={40}/></div>
                    <p className='text-base'>Strona Główna</p>
                </div>
            </a>
            <a href="/proxy/3000/words">
                <div className='flex flex-col justify-center text-center'>
                    <div className='flex justify-center'><TbAbc size={40}/></div>
                    <p className='text-base'>Słowa</p>
                </div>
            </a>
            <a href="/proxy/3000/quiz">
                <div className='flex flex-col justify-center text-center'>
                    <div className='flex justify-center'><BsQuestionSquare  size={40}/></div>
                    <p className='text-base'>Quiz</p>
                </div>
            </a>
            <a href="/proxy/3000/settings">
                <div className='flex flex-col justify-center text-center'>
                    <div className='flex justify-center'><IoSettingsOutline size={40}/></div>
                    <p className='text-base'>Ustawienia</p>
                </div>
            </a>
        </div>
    )
}
