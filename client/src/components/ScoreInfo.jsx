import React from 'react'
import CircleScore from './CircleScore'
export default function ScoreInfo() {
  return (
    <div className='bg-gradient-to-r from-sky-500 to-indigo-500 p-4 rounded-md'>
       <CircleScore percentage={85} colour="blue" />
    </div>
  )
}
