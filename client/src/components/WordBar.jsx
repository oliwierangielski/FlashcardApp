import React, {useState, useEffect} from 'react'
import { commonColors, semanticColors } from "@nextui-org/theme";
import { useTheme } from 'next-themes'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Select, SelectItem, Tabs, Tab } from "@nextui-org/react";
import { SiAddthis } from "react-icons/si";
import ServerApi from '../api/ServerApi';


export default function WordBar(props) {
    const { theme, setTheme, forcedTheme, resolvedTheme, systemTheme } = useTheme()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedData, setSelectedData] = useState({});
    let fontColor = semanticColors[systemTheme]?.primary.foreground

    useEffect(() => {
        setSelectedData({original: props.original, translation: props.translation, category: props.category, type: props.type})

      }, [])

    return (
        <>
            <p className='text-primary-foreground text-sm'>kat. {props.category == "general" ? "Ogólne" : props.category}</p>
            <div className="flex flex-row items-center justify-evenly w-full h-12  bg-secondary-background rounded-lg mb-7 text-primary-foreground" onClick={onOpen}>
                <p className='font-roboto-medium text-lg'>{props.original}</p>
                <svg width="156" height="16" viewBox="0 0 156 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.03264 7.29289C0.642115 7.68342 0.642115 8.31658 1.03264 8.70711L7.3966 15.0711C7.78712 15.4616 8.42029 15.4616 8.81081 15.0711C9.20134 14.6805 9.20134 14.0474 8.81081 13.6569L3.15396 8L8.81081 2.34315C9.20134 1.95262 9.20134 1.31946 8.81081 0.928932C8.42029 0.538408 7.78712 0.538408 7.3966 0.928932L1.03264 7.29289ZM155.101 8.70711C155.491 8.31658 155.491 7.68342 155.101 7.29289L148.737 0.928932C148.346 0.538408 147.713 0.538408 147.322 0.928932C146.932 1.31946 146.932 1.95262 147.322 2.34315L152.979 8L147.322 13.6569C146.932 14.0474 146.932 14.6805 147.322 15.0711C147.713 15.4616 148.346 15.4616 148.737 15.0711L155.101 8.70711ZM1.73975 9L154.393 9V7L1.73975 7L1.73975 9Z" fill={fontColor} />
                </svg>
                <p className='font-roboto-medium text-lg'>{props.translation}</p>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Select
                                    isRequired
                                    label="Typ"
                                    placeholder="Wybierz typ słowa"
                                    // selectedKeys={[selectedData?.wordTab?.types]}
                                    // value={selectedData.type}
                                    defaultSelectedKeys={[selectedData.type]}
                                    onChange={(e) => {
                                        let data = selectedData
                                        data.type = e.target.value
                                        setSelectedData(data)
                                    }}
                                >
                                    <SelectItem key="noun" value="noun">Rzeczownik</SelectItem>
                                    <SelectItem key="verb" value="verb">Czasownik</SelectItem>
                                    <SelectItem key="adverb" value="adverb">Przymiotnik</SelectItem>
                                    <SelectItem key="adjective" value="adjective">Przysłówek</SelectItem>
                                    {props.data?.language.english.types.map((e, i) => (
                                        <SelectItem key={e} value={e}>
                                            {e}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isRequired
                                    label="Kategoria"
                                    placeholder="Wybierz kategorię słowa"
                                    // selectedKeys={[selectedData?.wordTab?.types]}
                                    // items={props.data?.language.english.categories}
                                    // value={selectedData.category}
                                    defaultSelectedKeys={[selectedData.category]}
                                    onChange={(e) => {
                                        let data = selectedData
                                        data.category = e.target.value
                                        setSelectedData(data)
                                    }}
                                >
                                    <SelectItem key="general" value="general">Ogólne</SelectItem>
                                    {props.data?.language.english.categories.map((e, i) => (
                                        <SelectItem key={e} value={e}>
                                            {e}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    isRequired
                                    autoFocus
                                    label="Po angielsku"
                                    placeholder="Wpisz słowo po angielsku"
                                    variant="bordered"
                                    defaultValue={selectedData.original}
                                    onChange={(e) => {
                                        let data = selectedData
                                        data.original = e.target.value
                                        setSelectedData(data)
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Po polsku"
                                    placeholder="Wpisz słowo po polsku"
                                    variant="bordered"
                                    defaultValue={selectedData.translation}
                                    onChange={(e) => {
                                        let data = selectedData
                                        data.translation = e.target.value
                                        setSelectedData(data)
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={async () => {
                                    await ServerApi.deleteWord( props.reloadData , props.original)
                                    // setSelectedData()
                                    onClose()
                                }}>
                                    Usuń
                                </Button>
                                <Button color="primary" onPress={async () => {
                                    await ServerApi.patchWord(selectedData.type, selectedData.category, selectedData.original, selectedData.translation , props.reloadData , props.original)
                                    // setSelectedData()
                                    onClose()
                                }}>
                                    Zmień
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
