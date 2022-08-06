//#region variaveis
const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const main_section = document.getElementById("main-section")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
const load_btn = document.getElementById("load-btn")
let offset = 1, limit = 17
//#endregion


//#region functions
//função que recebe o nome do pokemon e o insere no card
function insert_pokemon_on_card(pokemon) {
  const card = CardCreator.generate_card(pokemon)
  pokemons_row.appendChild(card)
}

//função que recebe o nome do pokemon como parametro e faz a busca
async function search_pokemon(pokemon_name) {
  const response = await fetch(`${BASE_URL}pokemon/${pokemon_name}`)
  const pokemon_data_json = await response.json()

  const search_card = CardCreator.generate_card(pokemon_data_json)
  main_section.replaceChildren(search_card)
}


//recebe os valores offset que é diz de onde vai começar a busca pelo pokemons, e limit que estabelece o limite de pokemons que vai ser buscado e renderizado
//por padrão ele renderiza os primeiros 18 pokemons
async function rend_pokemon_list(offset, limit) {

  for (let i = 0; i <= limit; i++){
  const POKEMONS_URL = BASE_URL + `pokemon/${i + offset}`
  const pokemon_data = await fetch(POKEMONS_URL).then(resp => resp.json());
  insert_pokemon_on_card(pokemon_data)
}

}

// evento que dispara quando o botão de busca for clicado para buscar um pokémon
search_btn.addEventListener("click", () => {
  const pokemon_name = search_input.value.toLowerCase()
  search_pokemon(pokemon_name)
})

// evento que dispara quando o botão de load for clicado, carregando mais pokemons a partir do ultimo pokemon a ser carregado no card
load_btn.addEventListener("click", () => {
  offset+= limit + 1
  rend_pokemon_list(offset, limit)
})

//#endregion

rend_pokemon_list(offset, limit)
