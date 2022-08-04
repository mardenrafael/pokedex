//#region variaveis
const BASE_URL = "https://pokeapi.co/api/v2/"
const pokemons_row = document.getElementById("pokemons_row")
const search_input = document.getElementById("search")
const search_btn = document.getElementById("search-btn")
//#endregion

//#region functions
// recebe o nome do pokemon como parametro, busca o pokemon pelo nome
// gerar o card e depois insere no html
async function search_pokemon_and_insert_on_page(pokemon_name) {
  const response = await fetch(`${BASE_URL}pokemon/${pokemon_name}`)
  const pokemon_data_json = await response.json()

  const search_card = CardCreator.generate_card(pokemon_data_json)
  pokemons_row.appendChild(search_card)
}


//No momento em que o arquivo é carregado ele busca os primeiros 150 pokemons e os insere ele na pagina
async function rend_pokemon_list() {

  //esse request busca uma lista dos primeiros 150 pokemons
  const MAX_POKEMONS_IN_ROW = 3
  const POKEMONS_URL = BASE_URL + "pokemon?offset=0&limit=150"
  const response = await fetch(POKEMONS_URL)
  const pokemons_list = await response.json().then((resp) => {
    return resp.results
  });

  // cria um array para armazenar pokemons selecionados aleatoriamente
  let pokemons_list_ref = []
  //seleciona pokemons aleatorios dentro da lista de pokemons retornados da API
  for (let i = 0; i < MAX_POKEMONS_IN_ROW; i++) {
    pokemons_list_ref.push(pokemons_list[Math.floor(Math.random() * pokemons_list.length)])
  }

  //Busca os dados dos pokemons selecionados e os insere na pagina
  for (let i = 0; i < pokemons_list_ref.length; i++) {
    search_pokemon_and_insert_on_page(pokemons_list_ref[i].name)
  }
}

// evento que dispara quando o botão de busca for clicado para buscar um pokémon
search_btn.addEventListener("click", () => {
  const pokemon_name = search_input.value.toLowerCase()
  search_pokemon_and_insert_on_page(pokemon_name)
})
//#endregion

rend_pokemon_list()
