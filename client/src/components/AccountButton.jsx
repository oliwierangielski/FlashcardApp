import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

export default function AccountButton() {
  return (
    <div className='bg-default-100 p-3 flex justify-center items-center rounded-lg'>
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="md" isBordered radius="sm" />
    </div>
  )
}
