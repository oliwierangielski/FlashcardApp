import React from 'react'
import { IconContext } from "react-icons";
import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutButton() {
  return (
    <div className='bg-danger-700 flex p-2 justify-center items-center rounded-md max-w-18'>
    <IconContext.Provider value={{ size: "2em" }}>
        <IoLogOutOutline />
    </IconContext.Provider>
  </div>
  )
}
