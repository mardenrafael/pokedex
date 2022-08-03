class CardCreator {

  /**
   * 
   * @param {JSON} pokemon_data Objeto json com os dados do pokemon
   * @returns {HTMLDivElement} retorna uma div formatada com as classes para ser inserida dentro do site
   */
  static generate_card(pokemon_data) {
    //Cria a div principal e configura ela
    const div = document.createElement("div")
    div.setAttribute("class", "card")

    //Cria a header principal e configura ela
    const header = document.createElement("header")
    header.setAttribute("class", "header_card")
    header.innerText = `${pokemon_data.name.toUpperCase()}`

    //Cria a imagem dos pokemons
    const img_element = document.createElement("img")
    img_element.setAttribute("src", pokemon_data.sprites.other["official-artwork"].front_default)
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

  /**
   * 
   * @param {JSON} pokemon_data Objeto json com os dados do pokemon
   * @returns {HTMLDivElement} retorna uma div para ser inserida dentro do site
   */
  static show_more_info(pokemon_data) {
    //seleciona a section onde as informações vão ser exibidas
    const info_section = document.getElementById("show-info")

    //cria a div onde vão ser mostradas as informações
    const div = document.createElement("div")
    div.setAttribute("class", "info-card")

    //cria o header da div
    const header = document.createElement("header")
    header.setAttribute("class", "header_info")
    header.innerText = `${pokemon_data.name.toUpperCase()}`

    //cria o elemento da imagem do pokémon
    const img_element = document.createElement("img")
    img_element.setAttribute("src", pokemon_data.sprites.other["official-artwork"].front_default)
    img_element.setAttribute("alt", pokemon_data.name)
    img_element.setAttribute("class", "info_img")

    const section = document.createElement("section")
    section.setAttribute("class", "section_info")

    section.appendChild(header)
    section.appendChild(img_element)

    //cria e configura a sections das habilidades do pokemon
    const abilties_section = document.createElement("section")
    abilties_section.setAttribute("class", "section_info")

    //cria, configura e adiciona o cabeçalho da sections
    const header_abilities = document.createElement("header")
    header_abilities.setAttribute("class", "sub-header_info")
    header_abilities.innerText = `ABILITIES`

    //cria, e configura um container para a lista de abilidades
    const abilities_list_outter_container = document.createElement("section")
    abilities_list_outter_container.setAttribute("class", "info_abilities")
    //cria uma lista de abilidades
    const abilities_list = document.createElement("ul")
    abilities_list.setAttribute("class", "abilities_list")

    //passa atraves de todas abilitades do pokemon e insere eles dentro de uma lista
    pokemon_data.abilities.map((ability) => {
      abilities_list.innerHTML += ability.is_hidden ? `<li> ${ability.ability.name}: hidden </li> ` : `<li> ${ability.ability.name}: not hidden </li>`
    })

    //insere a lista de habilidades dentro do container
    abilities_list_outter_container.appendChild(abilities_list)


    abilties_section.appendChild(header_abilities)
    abilties_section.appendChild(abilities_list_outter_container)
    //

    div.appendChild(section)
    div.appendChild(abilties_section)


    //insere a div no html
    info_section.replaceChildren(div)

    return div
  }
}
