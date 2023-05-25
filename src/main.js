import { filterData } from './data.js';
import { sortData } from './data.js';
import data from './data/ghibli/ghibli.js';

const dataFilms = data.films
const dataCharactersByFilm = []
dataFilms.forEach(film => dataCharactersByFilm.push(film.people))
const allCharacters = dataCharactersByFilm.flat()

const titlePage = document.querySelector('.title-page')
const linkPeliculas = document.querySelectorAll('.peliculas')
const linkPersonajes = document.querySelectorAll('.personajes')
const containerNode = document.querySelector('.container')
const sortSelector = document.querySelector('#sortSelector')
const search = document.querySelector('.src')
const menu = document.querySelector('.menu')
const menuIcon = document.querySelector('.menu-icon')
const mediaQueryDesktop = window.matchMedia("(min-width: 768px)");

// Estado inicial de la pagina
renderMovies(dataFilms)

// Listeners para aplicar funcionalidad

mediaQueryDesktop.addEventListener ('change', () => {    
    menu.classList.add('menu-inactive')       
})

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('menu-inactive')
})

linkPeliculas.forEach((item) => {
    item.addEventListener('click', () => {
        clearNodes(containerNode)
        renderMovies(dataFilms)
    })    
})

linkPersonajes.forEach((item) => {
    item.addEventListener('click', () => {
        clearNodes(containerNode)
        renderCharacters(allCharacters)
    })
})

search.addEventListener('change', (event) => {
   clearNodes(containerNode)  
   if (event.target.value != '') {    
        const filter = filterData(dataFilms, event.target.value);
        renderMovies(filter);
   } else {
        clearNodes(containerNode)
        renderMovies(dataFilms)
        containerNode.classList.add('container')
   }
})

sortSelector.addEventListener('change', (event) => {
    clearNodes(containerNode)
    
    if (event.target.value === 'A-Z'){
        renderMovies(sortData(data.films, 'A-Z'))   
    }
    if (event.target.value === 'Z-A'){
        renderMovies(sortData(data.films, 'A-Z', 'DES'))   
    }
    if (event.target.value === 'Year1-9') {       
        renderMovies(sortData(data.films, 'Year')) 
    }
    if (event.target.value === 'Year9-1') {       
        renderMovies(sortData(data.films, 'Year', 'DES'))
    }
    if (event.target.value === 'Ranking') {       
        renderMovies(sortData(data.films, 'Ranking', 'DES'))
    }
})

// Declaracion de las funciones

function clearNodes (parentNode){
    while (parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild)
    }
}

function renderMovies (films) {
    const nodesToBeAppend = []
    titlePage.textContent = 'Peliculas'
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
    
        const content = document.createElement("div")
        content.append(image, name, date, ranking)
        nodesToBeAppend.push(content)
        })
        containerNode.append(...nodesToBeAppend)
    } else {
        const notFoundInfo = document.createElement("h3")
        notFoundInfo.textContent = 'No se encuentran resultados de la busqueda, por favor intente de nuevo.'
        containerNode.classList.remove('container')
        containerNode.append(notFoundInfo)        
    }
}

function renderCharacters (characters) {
    const nodesToBeAppend = []
    titlePage.textContent = 'Personajes'
    if (characters.length > 0) {
        characters.forEach((item) => {
        const image = document.createElement("img")
        image.src = item.img
        
        const name = document.createElement("h2")
        name.textContent = item.name
    
        const age = document.createElement("h2")
        age.textContent = `Edad: ${item.age}`
    
        const content = document.createElement("div")
        content.append(image, name, age)
        nodesToBeAppend.push(content)
        }) 
        containerNode.append(...nodesToBeAppend)
    } else {
        const notFoundInfo = document.createElement("h3")
        notFoundInfo.textContent = 'No se encuentran resultados de la busqueda, por favor intente de nuevo.'
        containerNode.classList.remove('container')
        containerNode.append(notFoundInfo) 
    }    
}