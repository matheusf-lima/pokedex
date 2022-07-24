const pokemon_name = document.querySelector('.pokemon_name')
const pokemon_number = document.querySelector('.pokemon_number')
const pokemon_img = document.querySelector('.pokemon_img')

const buttonprev = document.querySelector('.btn_prev')
const buttonnext = document.querySelector('.btn_next')

let searchpokemon = 1;

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const pokemon_type0 = document.querySelector('.pokemon_type_0')
const pokemon_type1 = document.querySelector('.pokemon_type_1')

const fetchpokemon = async (pokemon) => {
    const apiresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiresponse.status === 200) {
        const data = await apiresponse.json();
        return data;
    }
    
    
}

const redenpokemon = async (pokemon) => {

    pokemon_name.innerHTML = 'Carregando'

    const data = await fetchpokemon(pokemon);

    if (data) {
        pokemon_img.style.display = 'block'
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemon_type0.innerHTML = data['types']['0']['type']['name']
        pokemon_type1.innerHTML = data['types']['1']['type']['name']
        searchpokemon = data.id
    } else {
        pokemon_name.innerHTML = 'Não encontrado';
        pokemon_number.innerHTML = '';
        pokemon_img.style.display = 'none'
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    redenpokemon(input.value.toLowerCase());
    input.value = ''
})

buttonprev.addEventListener('click', () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        redenpokemon(searchpokemon)
    } else {
        alert('Não é possivel pesquisar anterior a 1!')
    }
})

buttonnext.addEventListener('click', () => {
    searchpokemon += 1;
    redenpokemon(searchpokemon);
})

redenpokemon(searchpokemon)
