import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Select, SelectItem, Tabs, Tab } from "@nextui-org/react";
import { BiSearchAlt } from "react-icons/bi";
import WordBar from './WordBar';
export default function WordCreatorModal(props) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filteredData, setFilteredData] = useState(null);
    const [searchPhrase, setSearchPhrase] = useState("");
    return (
        <>
            <div onClick={onOpen}>
                <BiSearchAlt size={30} />
            </div>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top"
                classNames={{ base: "bg-transparent shadow-none" }}
                size="4xl"
                hideCloseButton="true"
                onClose={() => {setSearchPhrase("");setFilteredData(null)}}
            >
                <ModalContent>
                    <div className="size-full flex flex-col items-center p-2.5">
                        <div className="w-96">
                            <Input
                                type="text"
                                placeholder="Wyszukaj słowo"
                                size="lg" autoFocus classNames={{ input: ["p-7", "font-roboto-medium", "focus:outline-none"] }}
                                fullWidth="false"
                                onChange={(e) => {
                                    let text = e.target.value
                                    setSearchPhrase(text)
                                    let regex = new RegExp(text.toLocaleLowerCase())
                                    let newFilteredData = props.data?.language.english.words.filter((e) => regex.test(e.original.toLocaleLowerCase()) || regex.test(e.translation.toLocaleLowerCase()) || regex.test(e.type.toLocaleLowerCase()))
                                    setFilteredData(newFilteredData)
                                }}
                            />
                        </div>
                        <div className='pt-24 w-full flex flex-col items-center'>
                            {
                                filteredData?.length == 0
                                    ? <div className='text-center'>
                                        <div>
                                            <p className='font-roboto-regular text-3xl text-primary-foreground'>Brak wyników wyszukiwania dla "{searchPhrase}"</p>
                                        </div>
                                        <div>
                                            <p className='font-roboto-regular text-xl text-zinc-400'>Spróbuj wyszukać coś innego</p>
                                        </div>
                                    </div>
                                    : searchPhrase == "" ? <></> : filteredData?.map((e, i) => <WordBar key={i} original={e.original} translation={e.translation} category={e.category} data={props.data} type={e.type}/>)
                            }
                        </div>
                    </div>


                </ModalContent>

            </Modal>
        </>
    )
}
