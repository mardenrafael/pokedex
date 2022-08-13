//#region variaveis
const BASE_URL = "https://pokeapi.co/api/v2/"
const change_color_mode_btn = document.getElementById("change_color_mode")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
const load_btn = document.getElementById("load-btn")
const pokemons_cards = []
let last_pokemon_id = 0
let is_dark_mode = false
//#endregion
change_color_mode_btn.addEventListener("click", () => {
  change_color_mode()
})

//#region functions
//função que recebe o nome do pokemon e o insere no card
function insert_pokemon_on_card(pokemon) {
  const pokemons_row = document.getElementById("pokemons_row")

  const card = CardCreator.generate_card(pokemon)
  pokemons_cards.push(card)
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


function change_color_mode() {
  const checkbox = document.getElementById("check")
  const body = document.querySelector("body")


  const dark_color = "var(--terciary_color_dark)"
  const default_color = "var(--terciary_color)"

  if (checkbox.checked && is_dark_mode) {
    body.style.backgroundColor = dark_color

    for (let i = 0; i < pokemons_cards.length; i++) {
      pokemons_cards[i].children[1].style.backgroundColor = dark_color
    }
  } else {
    body.style.backgroundColor = default_color


    for (let i = 0; i < pokemons_cards.length; i++) {
      pokemons_cards[i].children[1].style.backgroundColor = default_color
    }
  }

  is_dark_mode = !is_dark_mode
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
