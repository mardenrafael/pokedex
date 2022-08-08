//#region variaveis
const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const main_section = document.getElementById("main-section")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
const load_btn = document.getElementById("load-btn")
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


/**
 * 
 * @param {Number} offset Indica onde vai comecçar a busca pelos pokemons
 * @param {*} limit Indica o limete de buscas que vão ser feitas
 */
async function rend_pokemon_list(offset = 1, limit = 18) {

  for (let i = 0; i < limit; i++) {
    const POKEMONS_URL = BASE_URL + `pokemon/${i + offset}`
    console.log(offset);
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
  rend_pokemon_list()
})

//#endregion

rend_pokemon_list()
