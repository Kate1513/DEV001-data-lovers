import { filterData } from './data.js';
import { sortData } from './data.js';
import data from './data/ghibli/ghibli.js';

const dataFilms = data.films

let allMovies = []
const containerNode = document.querySelector('.container')
const sortSelector = document.querySelector('#sortSelector')
const search = document.querySelector('.src')
const menu = document.querySelector('.menu')
const menuIcon = document.querySelector('.menu-icon')
const mediaQueryDesktop = window.matchMedia("(min-width: 768px)");

mediaQueryDesktop.addEventListener ('change', () => {
    if (!menu.classList.contains('menu-inactive')) {
        menu.classList.add('menu-inactive')
    }
})

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('menu-inactive')
})

function renderMovies (films) {
    if (films.length > 0) {
        films.forEach((item) => {
        const image = document.createElement("img")
        image.src = item.poster
        
        const name = document.createElement("h2")
        name.textContent = item.title
    
        const date = document.createElement("h2")
        date.textContent = `Fecha: ${item.release_date}`

        const ranking = document.createElement("h2")
        ranking.textContent = `Ranking: ${item.rt_score}`
    
        const container = document.createElement("div")
        container.append(image, name, date, ranking)
        allMovies.push(container)
        })
    } else {
        const a = document.createElement("h3")
        a.textContent = 'No se encuentran resultados de la busqueda, por favor intente de nuevo.'
        const container = document.createElement("h3")
        container.append(a)
        allMovies.push(container)
    }
}

function clearNodes (parentNode){
    while (parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild)
    }
}

search.addEventListener('change', (event) => {
   allMovies = []
   clearNodes(containerNode)  
   if (event.target.value != '') {    
   let filter = filterData(dataFilms, event.target.value)
   renderMovies(filter)
   containerNode.append(...allMovies)
   } else {
    renderMovies(dataFilms)
    clearNodes(containerNode)
    containerNode.append(...allMovies) 
   }
})

sortSelector.addEventListener('change', (event) => {
    allMovies = []
    clearNodes(containerNode)
    if (event.target.value === 'A-Z'){
        renderMovies(sortData(data.films, 'A-Z'))
        containerNode.append(...allMovies)     
    }
    if (event.target.value === 'Z-A'){
        renderMovies(sortData(data.films, 'A-Z', 'DES'))
        containerNode.append(...allMovies)     
    }
    if (event.target.value === 'Year1-9') {       
        renderMovies(sortData(data.films, 'Year'))
        containerNode.append(...allMovies) 
    }
    if (event.target.value === 'Year9-1') {       
        renderMovies(sortData(data.films, 'Year', 'DES'))
        containerNode.append(...allMovies) 
    }
    if (event.target.value === 'Ranking') {       
        renderMovies(sortData(data.films, 'Ranking', 'DES'))
        containerNode.append(...allMovies) 
    }
})
 
renderMovies(dataFilms)
containerNode.append(...allMovies)
