const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const card_generator = new Card


//Realiza uma busca atraves do nome do pokemon
async function get_pokemon(pokemon_name = "") {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon_name}`)
    const pokemon_data_json = await response.json()

    return await pokemon_data_json
}


//No momento em que o arquivo é carregado ele busca 3 pokemons aleatorios e insere ele na pagina
async function get_random_pokemon() {
    //esse request busca uma lista dos 20 primeiros pokemons
    const POKEMONS_URL = BASE_URL + "pokemon?offset=0&limit=20"
    const response = await fetch(POKEMONS_URL)
    const pokemon_list = await response.json().then((resp) => {
        return resp.results
    })

    //seleciona 3 pokemons aleatorios dentro da lista de 20 pokemons retornadas
    let chossen_pokemons_reference = []
    
    for(let i = 0; i < 3; i++) {
        chossen_pokemons_reference.push(pokemon_list[Math.floor(Math.random() * pokemon_list.length)])
    }
    
    //Busca os dados dos pokemons selecionados
    let chossen_pokemons_data = []

    for (let i = 0; i < chossen_pokemons_reference.length; i++){
        chossen_pokemons_data.push(await get_pokemon(chossen_pokemons_reference[i].name))
    }

    //insere os pokemons buscados no html
    for (let i = 0; i < chossen_pokemons_data.length; i++) {
        insert_pokemon_on_card(chossen_pokemons_data[i])
    }
}


// recebe commo parametro o pokemon pesquisado e insere ele na pagina
function insert_pokemon_on_card(pokemon) {
    const card = card_generator.generate_card(pokemon)
    pokemons_row.appendChild(card)
}


get_random_pokemon()