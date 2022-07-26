const BASE_URL = "https://pokeapi.co/api/v2/"



//No momento em que o arquivo é carregado ele busca 3 pokemons aleatorios e insere ele na pagina
async function get_random_pokemon() {
    const POKEMONS_URL = BASE_URL + "pokemon?offset=0&limit=20"
    const response = await fetch(POKEMONS_URL)
    const pokemon_list = await response.json().then((resp) => {
        return resp.results
    })

    let chossen_pokemons = []
    
    for(let i = 0; i < 3; i++) {
        chossen_pokemons.push(pokemon_list[Math.floor(Math.random() * pokemon_list.length)])
    }
    
    for (let i = 0; i < chossen_pokemons.length; i++) {
        insert_pokemon_on_card(chossen_pokemons[i])
    }

    // const chossen_pokemon_json = await response.json()

    // return chossen_pokemon_json
}


// recebe commo parametro o pokemon pesquisado e insere ele na pagina
function insert_pokemon_on_card(pokemon) {
    //limpar os dados do json
    //inserir eles na div de acordo com o design

    console.log(pokemon.name);
}


get_random_pokemon()