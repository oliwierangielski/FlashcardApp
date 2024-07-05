import React from 'react'
import NavigationBar from './NavigationBar'
import {Outlet} from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function Root(props) {
  let location = useLocation();
  return (
    <div className='h-screen w-screen flex flex-row root'>
      <NavigationBar path={location.pathname}/>
      <div className="size-full overflow-scroll">
        <Outlet/>
      </div>
    </div>
  )
}
