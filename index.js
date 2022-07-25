const BASE_URL = "https://pokeapi.co/api/v2/pokemon/pikachu"




async function get_random_pokemon() {
    const response = await fetch(BASE_URL)
    const json = await response.json()

    return json
}


// recebe commo parametro o pokemon pesquisado
function insert_pokemon_on_card(pokemon) {
    //limpar os dados do json
    //inserir eles na div de acordo com o design
}


get_random_pokemon().then( pokemon => { 
    insert_pokemon_on_card(pokemon)
})