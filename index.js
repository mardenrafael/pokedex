//#region variaveis
const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const main_section = document.getElementById("main-section")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
const load_btn = document.getElementById("load-btn")
let last_pokemon_id = 0
//#endregion


//#region functions
//função que recebe o nome do pokemon e o insere no card
function insert_pokemon_on_card(pokemon) {
  const card = CardCreator.generate_card(pokemon)
  pokemons_row.appendChild(card)
}


/**
 * 
 * @param {String} pokemon_name Nome do pokemon que vai ser pesquisado 
 * @returns Json com os dados do pokemon
 */
async function search_pokemon(pokemon_name) {
  const response = await fetch(`${BASE_URL}pokemon/${pokemon_name}`)
  const pokemon_data_json = await response.json()

  return pokemon_data_json
}


/**
 * 
 * @param {Number} offset Indica onde vai comecçar a busca pelos pokemons
 * @param {Number} limit Indica o limete de buscas que vão ser feitas
 */
async function rend_pokemon_list(offset = 1, limit = 18) {

  for (let i = 0; i < limit; i++) {
    const pokemon_data = await search_pokemon(i + offset)
    insert_pokemon_on_card(pokemon_data)
  }

  last_pokemon_id += limit
}


// evento que dispara quando o botão de busca for clicado para buscar um pokémon
search_btn.addEventListener("click", () => {

  if (search_input.value != "") {
    const pokemon_name = search_input.value.toLowerCase()
    search_pokemon(pokemon_name).then(pokemon => {
      CardCreator.show_details(pokemon)
    })
  }
})

// evento que dispara quando o botão de load for clicado, carregando mais pokemons a partir do ultimo pokemon a ser carregado no card
load_btn.addEventListener("click", () => {
  rend_pokemon_list(last_pokemon_id)
})

//#endregion

rend_pokemon_list()
