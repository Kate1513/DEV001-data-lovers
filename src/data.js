// estas funciones son de ejemplo

export const filterData = (data, condition) => {
  const keyword = condition.toUpperCase()
  let filter = []
  
  if (condition.length === 1){
    filter = data.filter(film => film.title[0].toUpperCase() === keyword)
  } 
  if(condition.length > 1){
    filter = data.filter(film => film.title.toUpperCase().includes(keyword))
  }
  return filter
}

export const sortData = (data, sortBy, sortOrder) => {
  let orderSecuence = []
  const whichOrder = sortOrder === 'DES' ? orderSecuence = [1 , -1] : orderSecuence = [-1 , 1]
  
  //functions to order
  const byAlphabet = function () {
    data.sort((FilmA, FilmB) => {
      const filmA = FilmA.title.toUpperCase()
      const filmB = FilmB.title.toUpperCase()
      if (filmA< filmB){
        return orderSecuence[0]
      }
      if (filmA > filmB){
        return orderSecuence[1]
      }
      return 0
    }) 
  return data
  }             
  const byYear = function () {
    data.sort((FilmA, FilmB) => {
    const filmA = parseInt(FilmA.release_date)
    const filmB = parseInt(FilmB.release_date)

    if (filmA< filmB){
      return orderSecuence[0]
    }
    if (filmA > filmB){
      return orderSecuence[1]
    }
    return 0
  })
  return data
  }             

  const byRtScore = function () {data.sort((FilmA, FilmB) => {
    const filmA = parseInt(FilmA.rt_score)
    const filmB = parseInt(FilmB.rt_score)

    if (filmA< filmB){
      return orderSecuence[0]
    }
    if (filmA > filmB){
      return orderSecuence[1]
    }
    return 0
  }) 
    return data
  }

  switch(sortBy){
    case 'A-Z':  
      return byAlphabet()
    case 'Year': 
      return byYear()
    case 'Ranking': 
      return byRtScore()
  } 
}
