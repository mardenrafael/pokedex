const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
// // const card_generator = new Card

// recebe o nome do pokemon como parametro, chama a função get_pokemon para fazer pesquisa
// e o método generate_card para gerar o card e depois insere no html
async function search_pokemon(pokemon_name) {
    const pokemon_data = await get_pokemon(pokemon_name)

    const search_card = new Card(pokemon_data).generate_card(pokemon_data)
    pokemons_row.replaceChildren(search_card)
}

//Realiza uma busca atraves do nome do pokemon
async function get_pokemon(pokemon_name) {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon_name}`)
    const pokemon_data_json = await response.json()

    return await pokemon_data_json
}


//No momento em que o arquivo é carregado ele busca os primeiros 150 pokemons e os insere ele na pagina
async function rend_pokemon_list() {
    
    //esse request busca uma lista dos primeiros 150 pokemons
    const MAX_POKEMONS_IN_ROW = 3
    const POKEMONS_URL = BASE_URL + "pokemon?offset=0&limit=150"
    const response = await fetch(POKEMONS_URL)
    const pokemons_list = await response.json().then((resp) => {
        return resp.results
    })

    // cria um array para armazenar pokemons selecionados aleatoriamente
    let pokemons_list_ref = []

    //seleciona pokemons aleatorios dentro da lista de pokemons retornados da API
    for(let i = 0; i < MAX_POKEMONS_IN_ROW; i++) {
        pokemons_list_ref.push(pokemons_list[Math.floor(Math.random() * pokemons_list.length)])
    }


    //Busca os dados dos pokemons selecionados
    let pokemons_data = []

    for (let i = 0; i < pokemons_list_ref.length; i++){
        pokemons_data.push(await get_pokemon(pokemons_list_ref[i].name))
    }

    //insere os pokemons buscados no html
    for (let i = 0; i < 3; i++) {
        insert_pokemon_on_card(pokemons_data[i])
    }
}


// recebe commo parametro o pokemon pesquisado e insere ele na pagina
function insert_pokemon_on_card(pokemon) {
    const card = new Card(pokemon).generate_card(pokemon)
    pokemons_row.appendChild(card)
}

// evento que dispara quando o botão de busca for clicado para buscar um pokémon
search_btn.addEventListener("click", () => {
    const pokemon_name = search_input.value.toLowerCase()
    search_pokemon(pokemon_name)
})

rend_pokemon_list()