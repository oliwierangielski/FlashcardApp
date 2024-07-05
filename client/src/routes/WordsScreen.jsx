import React, { useState, useEffect, useRef } from 'react';
import WordBar from '../components/WordBar'
import ServerApi from '../api/ServerApi';
import WordCreatorModal from "../components/WordCreatorModal"
import SearchModal from '../components/SearchModal';

export default function WordsScreen() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    console.log("Wczytano dane")
    let serverData = await ServerApi.getData()
    setData(serverData)
  }
  useEffect(() => {
    fetchData()

  }, [])



  return (
    <div className='relative p-20 flex flex-col items-center size-full'>
      <div className='absolute top-0 left-0 p-2.5 cursor-pointer text-primary-foreground flex flex-row gap-4'>
        <WordCreatorModal data={data} reloadData={fetchData}/>
        <SearchModal data={data} />
      </div>
      <div className='mb-20'><p className='text-primary-foreground text-5xl font-roboto-medium'>Panel Słów</p></div>
      <div className='w-2/3'>
        <p className='text-primary-foreground text-3xl pb-5'>Rzeczowniki</p>
        {data?.language.english.words.filter((e) => e.type == "noun").sort(customSort).map((e, i) => <WordBar key={i} original={e.original} translation={e.translation} category={e.category} data={data} type={e.type} reloadData={fetchData}/>)}
        <p className='text-primary-foreground text-3xl pb-5'>Czasowniki</p>
        {data?.language.english.words.filter((e) => e.type == "verb").map((e, i) => <WordBar key={i} original={e.original} translation={e.translation} category={e.category} type={e.type} reloadData={fetchData}/>)}
        <p className='text-primary-foreground text-3xl pb-5'>Przymiotniki/Przysłówki</p>
        {data?.language.english.words.filter((e) => e.type == "adverb" || e.type == "adjective").map((e, i) => <WordBar key={i} original={e.original} translation={e.translation} category={e.category} data={data} type={e.type} reloadData={fetchData}/>)}
        <p className='text-primary-foreground text-3xl pb-5'>Własne typy</p>
        {data?.language.english.types.map((t, oi) => {
          return data?.language.english.words.find((e) => e.type == t) != undefined
            ? (<div key={oi}><p className='text-primary-foreground text-2xl pb-5'>{t}</p> {data?.language.english.words.filter((e) => e.type == t).map((e, ii) => <WordBar key={ii} original={e.original} translation={e.translation} category={e.category} data={data} type={e.type} reloadData={fetchData}/>)}</div>)
            : <></>
        })
        }
      </div>
    </div>
  )
}

function customSort(a, b) {
  // Umieść obiekty o kategorii "general" na początku
  if (a.category === "general" && b.category !== "general") {
    return -1;
  } else if (a.category !== "general" && b.category === "general") {
    return 1;
  }

  // Sortowanie alfabetyczne dla innych kategorii
  return a.category.localeCompare(b.category);
}
