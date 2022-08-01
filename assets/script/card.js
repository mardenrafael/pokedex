class CardCreator {

    generate_card(pokemon_data) {
        //Cria a div principal e configura ela
        const div = document.createElement("div")
        div.setAttribute("class", "card")

        //Cria a header principal e configura ela
        const header = document.createElement("header")
        header.setAttribute("class", "header_card")

        header.innerText = `${pokemon_data.name.toUpperCase()}`

        //Cria a section principal e configura ela
        // const section = document.createElement("section")
        // section.setAttribute("class", "section_card")

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

        more_info_button.innerText = `Mais informações sobre ${pokemon_data.name}`
       
        // chama o método show_more_info
        more_info_button.addEventListener("click", () => {
            this.show_more_info(pokemon_data)
        })

        footer.appendChild(more_info_button)

        div.appendChild(header)
        div.appendChild(img_element)
        div.appendChild(footer)


        return div
    }

    show_more_info(pokemon_name) {
        //seleciona a section onde as informações vão ser exibidas
        const info_section = document.getElementById("show-info")

        //cria a div onde vão ser mostradas as informações
        const div = document.createElement("div")
        div.setAttribute("class", "info-card")

        //cria o header da div
        const header = document.createElement("header")
        header.setAttribute("class", "header_info")
        header.innerText = `${pokemon_name.name.toUpperCase()}`

        //cria o elemento da imagem do pokémon
        const img_element = document.createElement("img")
        img_element.setAttribute("src", pokemon_name.sprites.front_default)
        img_element.setAttribute("alt", pokemon_name.name)
        img_element.setAttribute("class", "info_img")

        const section = document.createElement("section")
        section.setAttribute("class", "section_info")

        section.appendChild(header)
        section.appendChild(img_element)

        div.appendChild(section)

        //insere a div no html
        info_section.replaceChildren(div)
        
        return div

    }
}