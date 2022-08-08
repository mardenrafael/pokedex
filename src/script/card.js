class CardCreator {

  /**
   * 
   * @param {JSON} pokemon_data Objeto json com os dados do pokemon
   * @returns {HTMLDivElement} retorna uma div formatada com as classes para ser inserida dentro do site
   */
  static generate_card(pokemon_data) {

    //Cria a div principal e configura ela
    const main_div = this.#generate_element("div", {
      class: "card"
    })

    //Cria a header principal e configura ela
    const header = this.#generate_element("header", {
      class: "header_card"
    }, main_div)
    header.innerText = `${pokemon_data.name.toUpperCase()}`

    //Cria a imagem dos pokemons
    const img_element = this.#generate_element("img", {
      class: "card_img",
      src: pokemon_data.sprites.other["official-artwork"].front_default,
      alt: pokemon_data.name
    }, main_div)

    //Cria a footer principal e configura ela
    const footer = this.#generate_element("footer", {
      class: "footer_card"
    }, main_div)

    //Cria o botão de mais informações
    const more_info_button = this.#generate_element("button", {
      class: "more_info_btn"
    }, footer)
    more_info_button.innerText = `Mais informações sobre ${pokemon_data.name}`

    // chama o método show_more_info
    more_info_button.addEventListener("click", () => {
      this.show_more_info(pokemon_data)
      //scroll da tela para o topo
      window.scrollTo(
        {
          top: 0,
          behavior: "smooth"
        }
      )
    })

    return main_div
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
    const main_div = this.#generate_element("div", {
      class: "info-card"
    })

    // cria a section
    const section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria o header da div
    const header = this.#generate_element("header", {
      class: "header_info"
    }, section)

    header.innerText = `${pokemon_data.name.toUpperCase()}`

    //cria o elemento da imagem do pokémon
    const img_element = this.#generate_element("img", {
      class: "info_img",
      src: pokemon_data.sprites.other["official-artwork"].front_default,
      alt: pokemon_data.name
    }, section)

    const stats_section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria, configura e adiciona o cabeçalho da sections
    const header_stat = this.#generate_element("header", {
      class: "sub-header_info"
    }, stats_section)

    header_stat.innerText = `STATS`

    //cria, e configura um container para a lista de stats
    const stats_list_outter_container = this.#generate_element("section", {
      class: "info_stats",
    }, stats_section)

    //cria uma lista de stats
    const stat_list = this.#generate_element("ul", {
      class: "stats_list"
    }, stats_list_outter_container)

    //passa por todos os stats do pokemon e insere eles dentro de uma lista
    pokemon_data.stats.map((stat) => {
      stat_list.innerHTML += `<li> ${stat.stat.name}: ${stat.base_stat}</li>`
    })

    //cria e configura a sections dos stats do pokemon
    const abilities_section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria, configura e adiciona o cabeçalho da sections
    const header_abilities = this.#generate_element("header", {
      class: "sub-header_info"
    }, abilities_section)

    header_abilities.innerText = `ABILITIES`

    //cria, e configura um container para a lista de habilidades
    const abilities_list_outter_container = this.#generate_element("section", {
      class: "info_abilities",
    }, abilities_section)

    //cria uma lista de habilidades
    const abilities_list = this.#generate_element("ul", {
      class: "abilities_list"
    }, abilities_list_outter_container)

    //passa por todas habilitades do pokemon e insere eles dentro de uma lista
    pokemon_data.abilities.map((ability) => {
      abilities_list.innerHTML += ability.is_hidden ? `<li> ${ability.ability.name}: hidden </li> ` : `<li> ${ability.ability.name}: not hidden </li>`
    })

    //insere a div no html
    info_section.replaceChildren(main_div)
  }

  /**
   * 
   * @param {String} Element Elemento que deve ser criado 
   * @param {Object} Attributes Objetos com os atributos que vão ser criados e seus valores 
   * @param {HTMLElement} Parent Elemento HTML que vai ser pai do elemento que esta sendo criado 
   * @returns HTMLElement que foi criado
   */
  static #generate_element(Element, Attributes = null, Parent = null) {

    const element = document.createElement(Element)

    if (Attributes) {
      const attributes_array = Object.entries(Attributes)

      for (let i = 0; i < attributes_array.length; i++) {
        element.setAttribute(attributes_array[i][0], attributes_array[i][1])
      }
    }

    if (Parent) {
      Parent.appendChild(element)
    }

    return element
  }
}
