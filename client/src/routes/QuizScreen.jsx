import { Button, Card, CardBody, CardHeader, Listbox, ListboxItem } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import ServerApi from '../api/ServerApi';
import { useNavigate } from 'react-router-dom';
export default function QuizScreen() {

  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [category, setCategory] = useState(null)
  const [quizType, setQuizType] = useState(null)
  const fetchData = async () => {
    let serverData = await ServerApi.getData()
    setData(serverData)
  }
  useEffect(() => {
    fetchData()

  }, [])

  return (
    <div className='p-20 flex flex-col items-center size-full'>
      <div className='mb-20'><p className='text-primary-foreground text-5xl font-roboto-medium'>Panel Quizów</p></div>
      <div className='w-2/3 flex flex-col items-center gap-8'>
        {quizType == null ?
          <div className='size-full flex flex-row gap-8 justify-center'>
            <Card className={'w-2/5 p-2.5' + (quizType == 1 ? " text-primary-foreground bg-green-400" : "")} isPressable={true} onPress={() => { setQuizType(1) }}>
              <CardHeader><p className='font-roboto-medium text-xl'>Quiz: A,B,C,D</p></CardHeader>
              <CardBody className='h-44'>
                <p>Quiz oparty na wybieraniu jednej z 4 opcji</p>
              </CardBody>
            </Card>
            <Card className={'w-2/5 p-2.5' + (quizType == 2 ? " text-primary-foreground bg-green-400" : "")} isPressable={true} onPress={() => { setQuizType(2) }}>
              <CardHeader><p className='font-roboto-medium text-xl'>Quiz: słowo</p></CardHeader>
              <CardBody className='h-44'>
                <p>Quiz oparty na wpisywaniu przetłumaczonego słowa</p>
              </CardBody>
            </Card>
          </div>
          :
          <Card className='w-2/5 p-2.5'>
            <CardHeader><p className='font-roboto-medium text-xl'>Wybierz kategorię</p></CardHeader>
              <CardBody className='h-44'>
              <Listbox
                selectionMode="single"
                aria-label="Actions"
                onAction={(key) => setCategory(key)}
                selectedKeys={category}
                disabledKeys={filterWordsByCategoryCount(data?.language.english.words, data?.language.english.categories)}
              >
                <ListboxItem key="allin">Wszystkie</ListboxItem>
                {
                  data?.language.english.categories.map((e) => <ListboxItem key={e}>{e}</ListboxItem>)
                }
              </Listbox>
              </CardBody>
          </Card>
        }
        {category == null ? <></> : <Button color="success" className='text-primary-foreground' onClick={() => {navigate(`/proxy/3000/game/${quizType}/${category}`)}}>Rozpocznij Quiz</Button>}
      </div>
    </div>
  )
}

function filterWordsByCategoryCount(words, categories){
  let categoriesCount = categories.map((e) => ({name: e, count:0}))
  for(let i = 0; i < words.length; i++){
    const catIndex = categoriesCount.findIndex(obj => obj.name === words[i].category);
    if(catIndex != -1){
      categoriesCount[catIndex].count += 1
    }
  }
  console.log(categoriesCount.filter((e) => e.count < 10 ).map((e) => e.name))
  return (categoriesCount.filter((e) => e.count < 10 ).map((e) => e.name))

}



// function filterWordsByCategoryCount(words) {
//   let categoryCounts = {};

//   // Liczymy ilości słów w każdej kategorii
//   words.forEach(word => {
//       if (categoryCounts[word.category]) {
//           categoryCounts[word.category]++;
//       } else {
//           categoryCounts[word.category] = 1;
//       }
//   });

//   // Filtrujemy kategorie, które mają mniej niż 10 słów
//   let filteredCategories = Object.keys(categoryCounts).filter(category => categoryCounts[category] < 10);

//   // Filtrujemy słowa, aby zachować tylko te z kategoriami, które mają mniej niż 10 słów
//   // let filteredWords = words.filter(word => filteredCategories.includes(word.category));

//   return filteredCategories;
// }
