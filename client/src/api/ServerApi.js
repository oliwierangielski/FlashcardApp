export default class ServerApi {
    static async getData() {
         return await fetch('http://192.168.8.112:5000/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    static async patchData(data, reloadData){
        fetch('http://192.168.8.112:5000/data', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              // Dodaj dodatkowe nagłówki, jeśli są potrzebne
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(async result => await reloadData())
          .catch(error => console.error('Błąd:', error));
    }

    static async patchWord(type, category, original, translation, reloadData, oldOriginal){
        let data = await ServerApi.getData()
        let index = data?.language.english?.words.findIndex((e) => e.original == oldOriginal)
        if(index != -1){
            data.language.english.words[index] = {type: type, category: category, original: original, translation: translation}
            await ServerApi.patchData(data, reloadData)
        }
    }

    static async deleteWord(reloadData, oldOriginal){
        let data = await ServerApi.getData()
        let index = data?.language.english?.words.findIndex((e) => e.original == oldOriginal)
        console.log(index)
        if(index != -1){
            data?.language.english?.words.splice(index, 1)
            await ServerApi.patchData(data, reloadData)
        }
    }

    static async addWord(type, category, original, translation, reloadData) {
        let data = await ServerApi.getData()
        data?.language.english?.words.push({"type": type, "original": original, "translation": translation, "category": category})
        await ServerApi.patchData(data, reloadData)
    }

    static async addType(type, reloadData) {
        let data = await ServerApi.getData()
        data?.language.english?.types.push(type)
        await ServerApi.patchData(data, reloadData)
    }

    static async addCategory(category, reloadData) {
        let data = await ServerApi.getData()
        data?.language.english?.categories.push(category)
        await ServerApi.patchData(data, reloadData)
    }
}