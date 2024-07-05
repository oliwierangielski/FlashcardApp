import React from 'react'
import AccountButton from './AccountButton'
import PageButton from './PageButton'
import ScoreInfo from './ScoreInfo'
import {Divider} from "@nextui-org/divider";
import {Spacer} from "@nextui-org/spacer";
import LogoutButton from './LogoutButton';
// Icons Imports
import { AiOutlineHome } from "react-icons/ai";
import { RiFileListLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { HiOutlineChartPie } from "react-icons/hi";

export default function NavigationBar(props) {
  return (
    <div className="p-3 bg-secondary-background flex flex-col justify-between text-secondary-foreground items-center h-screen w-24 drop-shadow-md">
        {/* Top Div */}
        <div className='flex flex-col gap-y-7 items-center'>
          <AccountButton isSelected={props.path==='/proxy/3000/account'}/>
          <Divider orientation="horizontal" />
          <div className='flex flex-col gap-y-3 w-max'>
            <PageButton icon={<AiOutlineHome />} link='/proxy/3000/' path={props.path} />
            <PageButton icon={<RiFileListLine />} link='/proxy/3000/words' path={props.path} />
            <PageButton icon={<BsGear />} link='/proxy/3000/settings' path={props.path} />
            <PageButton icon={<MdOutlineQuiz />} link='/proxy/3000/quiz' path={props.path} />
            <PageButton icon={<HiOutlineChartPie />} link='/proxy/3000/statistics' path={props.path} />
          </div>
          <Divider orientation="horizontal" />
          <LogoutButton />
        </div>
        {/* Bottom Div */}
        <div>
          <ScoreInfo/>
        </div>



    </div>
  )
}
