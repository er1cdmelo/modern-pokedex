const output = document.querySelector('#outputimg');
const filterList = document.querySelector('#filter');
const filterBtn = document.querySelector('#filterbtn');
const ipt = document.querySelector('#ipt');
const searchBtn = document.querySelector('#dir')

ipt.addEventListener('keyup', () => {
    for(var i = 0; i < cards.length; i++){
        var cardId = cards[i].id.split('-');
        cards[i].style.display = 'flex';
        if(isNaN(ipt.value)){
            if(cardId[0].includes(ipt.value.toLowerCase())==false){
                cards[i].style.display = 'none'
            }
        }else{
            if(cardId[1].includes(ipt.value.toLowerCase())==false){
                cards[i].style.display = 'none'
            }
        }
    }
})


var filterAble = false
filterBtn.addEventListener('click', () => {
    if(filterAble){
        console.log('fechou')
        filterList.style.height = '0'
        filterAble = false
    }else{
        console.log('abriu')
        filterList.style.height = '200px';
        filterAble = true
    }
})

var jorge = new XMLHttpRequest;



const btn = document.querySelector('#btn');
let sprite;
var selectURL;

const colors = {
    greenpurple: 'linear-gradient(40deg, #66e86f, #9368B7)',
    redlightblue: 'linear-gradient(40deg, #f24444, #9197AE)',
    redlightblue: 'linear-gradient(40deg, #f24444, #9197AE)',
    lightpinklightblue: 'linear-gradient(40deg, #FAC8CD, #9197AE)',
    lightpinkpurple: 'linear-gradient(40deg, #FAC8CD, #9368B7)',
    lightpinkgreen: 'linear-gradient(40deg, #FAC8CD, #66e86f)',
    lightpinklightblue: 'linear-gradient(40deg, #FAC8CD, #9197AE)',
    purplebrown: 'linear-gradient(40deg, #9368B7, #F2A359)',
    purplelightblue: 'linear-gradient(40deg, #9368B7, #9197AE)',
    greypink: 'linear-gradient(40deg, #857E61, #F45B69)',
    greylightblue: 'linear-gradient(40deg, #857E61, #9197AE)',
    bluedarkred: 'linear-gradient(40deg, #2EC0F9, #6B0504)',
    bluepurple: 'linear-gradient(40deg, #2EC0F9, #9368B7)',
    bluedarkpurple: 'linear-gradient(40deg, #2EC0F9, #6247AA)',
    silvergreybrown: 'linear-gradient(40deg, #ADA8B6, #F2A359)',
    yellowlightgrey: 'linear-gradient(40deg, #ffd51c, #C1CAD6)',
    bluewhite: 'linear-gradient(40deg, #2EC0F9, #B2F7EF)',
    darkbluepurple: 'linear-gradient(40deg, #0F0326, #9368B7)',
    grass: '#66e86f',
    fire: '#f24444',
    poison: '#9368B7',
    orange: '#FF9F1C',
    electric: '#ffd51c',
    water: '#2EC0F9',
    normal: '#857E61',
    bug: '#FAC8CD',
    violet: '#F7AEF8',
    ground: '#F2A359',
    salmon: '#DB3A34',
    flying: '#9197AE',
    fighting: '#6B0504',
    fairy: '#F45B69',
    darkpurple: '#6247AA',
    rock: '#ADA8B6',
    steel: '#C1CAD6',
    white: '#B2F7EF',
    ghost: '#2a115c',
    dark: '#130236',
    ice: '#B2F7EF',
    psychic: '#6247AA',
    dragon: '#414066'
}
let filter = [];
const filterGrid = document.querySelector('#filter')
const listOfTypes = document.getElementsByClassName('type')
console.log(listOfTypes)

filterGrid.addEventListener('click', (e) => {
    console.log('parente: ' + e.target.parentElement.id);
    console.log('id: '+ e.target.id)
    if(e.target.parentElement.id !== null || e.target.parentElement.id !== undefined){
        
        if(e.target.parentElement.id === 'ul-dos-tipos'){
            if(e.target.id === 'clear'){
                filter = [];
                for(var i=0; i< listOfTypes.length; i++){
                    if(listOfTypes[i].classList.contains('activebtn')){
                        listOfTypes[i].classList.remove('activebtn')
                    }
                }
            }else {
                if(filter.includes(e.target.id)){
                    filter.splice(filter.indexOf(e.target.id));
                    e.target.classList.remove('activebtn')
                }else{
                    filter.push(e.target.id);
                    
                    e.target.classList.add('activebtn')
                }
            }
        }
        else{
            if(e.target.id === 'clearbtn'){
                filter = [];
                for(var i=0; i< listOfTypes.length; i++){
                    if(listOfTypes[i].classList.contains('activebtn')){
                        listOfTypes[i].classList.remove('activebtn')
                    }
                }
            }else {
                if(filter.includes(e.target.parentElement.id)){
                    filter.splice(filter.indexOf(e.target.parentElement.id));
                    e.target.parentElement.classList.remove('activebtn')
                }else{
                    filter.push(e.target.parentElement.id);
                    e.target.parentElement.classList.add('activebtn')
                }
            }
        }

        fetchPokemon();
    }
    
})

let cardTitles = document.getElementsByClassName('card-title');
let cards = document.getElementsByClassName('card')

const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []
    const pkmNum = 898
    for (let i = 1; i <= pkmNum; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(res => res.json()))
    }

    Promise.all(pokemonPromises)
        .then(pkm => {

            var pkId;
            const lisPokemons = pkm.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                
                if(filter.length < 1){
                    
                    if(pokemon.id < 10) {
                        pkId = '00' + pokemon.id;
                        console.log(pkId)
                    }
                    else if(pokemon.id >= 10 && pokemon.id < 100) {
                        pkId = '0' + pokemon.id
                    }
                    else if(pokemon.id >= 100) {
                        pkId = pokemon.id
                    };
                    var pksite = `https://www.pokemon.com/br/pokedex/${pkId}`;
                    console.log(pokemon.name + ': ' + pkId)
                    accumulator += `
                    
                    <li class='card' id='${pokemon.name}-${pokemon.id}'>
                    <img class="card-image ${types[0]}" alt="${pokemon.name}"  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                        <h2 class='card-title'>${pokemon.id}. ${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
                        <p class='card-subtitle'>${types.join(' | ')}</p>
                        <a href="${pksite}" target="_blank"><div class='card-link'><i class="fa fa-solid fa-info"></i></div></a>
                    </li>
                    
                `
                }
                else{
                    if(filter.some(item => types.includes(item))){
                        
                        if(pokemon.id < 10) {
                            pkId = '00' + pokemon.id;
                            console.log(pkId)
                        }
                        else if(pokemon.id >= 10 && pokemon.id < 100) {
                            pkId = '0' + pokemon.id
                        }
                        else if(pokemon.id >= 100) {
                            pkId = pokemon.id
                        };
                        var pksite = `https://www.pokemon.com/br/pokedex/${pkId}`;
                        console.log(pksite)
                        accumulator += `
                    
                    <li class='card' id='${pokemon.name}'>
                    <img class="card-image ${types[0]}" alt="${pokemon.name}"  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                        <h2 class='card-title'>${pokemon.id}. ${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
                        <p class='card-subtitle'>${types.join(' | ')}</p>
                    </li>
                    
                `
                    }
                }
                
                
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"')
            ul.innerHTML = lisPokemons
            
            afterFunc()
        })
    var afterFunc = async () => {

        const cardSub = document.getElementsByClassName('card-subtitle');
        var arr = Array.from(cardSub);
        for(var i = 0; i < cardTitles.length; i++){
            if(cardTitles[i].textContent.length > 18){
                cardTitles[i].style.fontSize = '1.2rem'
            }
        }

        for (var i = 0; i < arr.length; i++) {
            
            if(arr[i].textContent.length <= 8 ){
                
                var thisOneType = arr[i].textContent;
                arr[i].parentElement.style.background = `${colors[thisOneType]}`;
                
            }
            
            else if (arr[i].textContent.length > 8) {
                
                var typeArr = arr[i].textContent.split('|')
                arr[i].parentElement.style.background = `linear-gradient(40deg, ${colors[typeArr[0].trim()]}, ${colors[typeArr[1].trim()]})`;
                
            }
            

        }
    }



}

fetchPokemon()

