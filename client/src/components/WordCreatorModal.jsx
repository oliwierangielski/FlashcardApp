import React, {useState} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Select, SelectItem, Tabs, Tab } from "@nextui-org/react";
import { SiAddthis } from "react-icons/si";
import ServerApi from '../api/ServerApi';
export default function WordCreatorModal(props) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedData, setSelectedData] = useState({wordTab: {}, typesTab: {}, categoriesTab: {}, currentTab: ""});
  return (
    <>
    <div onClick={onOpen}>
          <SiAddthis size={30} />
      </div>
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dodaj słowo</ModalHeader>
            <ModalBody>
              <Tabs
                aria-label="Options"
                onSelectionChange={(e) => {
                  let data = selectedData
                  data.currentTab = e
                  setSelectedData(data)
                  // setSelectedData({wordTab: {}, typesTab: {}, categoriesTab: {}})
                }}
                >
                <Tab key="words" title="Słowa">
                  <Select
                    isRequired
                    label="Typ"
                    placeholder="Wybierz typ słowa"
                    // selectedKeys={[selectedData?.wordTab?.types]}
                    value={selectedData.wordTab?.typesSelect}
                    onChange={(e) => {
                      let data = selectedData
                      data.wordTab.typesSelect = e.target.value
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
                    value={selectedData.wordTab?.categoriesSelect}
                    onChange={(e) => {
                      let data = selectedData
                      data.wordTab.categoriesSelect = e.target.value
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
                    onChange={(e) => {
                      let data = selectedData
                      data.wordTab.originalInput = e.target.value
                      setSelectedData(data)
                    }}
                  />
                  <Input
                    isRequired
                    label="Po polsku"
                    placeholder="Wpisz słowo po polsku"
                    variant="bordered"
                    onChange={(e) => {
                      let data = selectedData
                      data.wordTab.translationInput = e.target.value
                      setSelectedData(data)
                    }}
                  />
                </Tab>
                <Tab key="types" title="Typy">
                  <Input
                    isRequired
                    label="Typ"
                    placeholder="Wpisz nową nazwę typu"
                    variant="bordered"
                    onChange={(e) => {
                      let data = selectedData
                      data.typesTab.typeInput = e.target.value
                      setSelectedData(data)
                    }}
                  />
                </Tab>
                <Tab key="categories" title="Kategorie">
                  <Input
                    isRequired
                    label="Kategoria"
                    placeholder="Wpisz nową nazwę kategorii"
                    variant="bordered"
                    onChange={(e) => {
                      let data = selectedData
                      data.categoriesTab.categoryInput = e.target.value
                      setSelectedData(data)
                    }}
                  />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Anuluj
              </Button>
              <Button color="primary" onPress={async () => {
                // console.log(selectedData.currentTab)
                switch(selectedData.currentTab){
                  case "words":
                      console.log("a", selectedData.wordTab.typesSelect)
                      if(selectedData.wordTab?.typesSelect == undefined || selectedData.wordTab?.categoriesSelect == undefined || selectedData.wordTab?.originalInput == undefined || selectedData.wordTab?.translationInput == undefined || selectedData.wordTab?.originalInput == "" || selectedData.wordTab?.translationInput == ""){
                        alert("Wpisz poprawne dane")
                      } else {
                        await ServerApi.addWord(selectedData.wordTab.typesSelect, selectedData.wordTab.categoriesSelect, selectedData.wordTab.originalInput, selectedData.wordTab.translationInput , props.reloadData)
                        setSelectedData({wordTab: {}, typesTab: {}, categoriesTab: {}, currentTab: ""})
                        onClose()
                      }

                    break;
                  case "types":
                      if(selectedData.typesTab?.typeInput == undefined || selectedData.typesTab?.typeInput == ""){
                        alert("Wpisz poprawne dane")
                      } else {
                        await ServerApi.addType(selectedData.typesTab.typeInput , props.reloadData)
                        setSelectedData({wordTab: {}, typesTab: {}, categoriesTab: {}, currentTab: ""})
                        onClose()
                      }

                    break;
                  case "categories":
                    if(selectedData.categoriesTab?.categoryInput == undefined || selectedData.categoriesTab?.categoryInput == ""){
                      alert("Wpisz poprawne dane")
                    } else {
                      await ServerApi.addCategory(selectedData.categoriesTab.categoryInput, props.reloadData)
                      setSelectedData({wordTab: {}, typesTab: {}, categoriesTab: {}, currentTab: ""})
                      onClose()
                    }
                    break;
                }

                }}>
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  )
}
