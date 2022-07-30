class Card {
    constructor(pokemon) {
        this.name = pokemon.name
        this.description = pokemon.description
        this.sprite = pokemon.sprites.front_default

    }

    generate_card(pokemon_data) {
        //Cria a div principal e configura ela
        const div = document.createElement("div")
        div.setAttribute("class", "card")

        //Cria a header principal e configura ela
        const header = document.createElement("header")
        header.setAttribute("class", "header_card")
        
        header.innerText = `${pokemon_data.name.toUpperCase()}`

        //Cria a section principal e configura ela
        const section = document.createElement("section")
        section.setAttribute("class", "section_card")

        //Cria a imagem dos pokemons
        const img_element = document.createElement("img")
        img_element.setAttribute("src", pokemon_data.sprites.front_default)
        img_element.setAttribute("alt", pokemon_data.name)
        img_element.setAttribute("class", "card_img")

        //Cria a footer principal e configura ela
        const footer = document.createElement("footer")
        footer.setAttribute("class", "footer_card")

        const more_info_button = document.createElement("button")
        more_info_button.setAttribute("class", "more_info_btn")
        more_info_button.setAttribute("id", "more_info_btn")

        more_info_button.innerText = `Mais informações sobre ${pokemon_data.name}`
        // link_to_pokemon.setAttribute("target", "_blank")
        // link_to_pokemon.setAttribute("href", "./assets/html/template.html")

        // link_to_pokemon.innerText = "Mais informações"  

        footer.appendChild(more_info_button)

        section.appendChild(img_element)

        div.appendChild(header)
        div.appendChild(img_element)
        div.appendChild(footer)
        div.appendChild(section)
        
        return div 
        

    }
}
