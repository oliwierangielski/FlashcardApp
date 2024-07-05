import React from 'react'
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';

export default function PageButton(props) {
  return (
    <Link to={props.link}>
      <div className={(props.path == props.link ? 'bg-zinc-500 ' : '') + 'flex p-2 justify-center items-center rounded-md max-w-18'}>
        <IconContext.Provider value={{ size: "2em" }}>
          {props.icon}
        </IconContext.Provider>
      </div>
    </Link>
  )
}
