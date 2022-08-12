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
    header.innerText = `${pokemon_data.id}- ${pokemon_data.name.toUpperCase()}`

    //Cria a imagem dos pokemons
    const img_element = this.#generate_element("img", {
      class: "card_img",
      src: pokemon_data.sprites.other.home.front_default,
      alt: pokemon_data.name
    }, main_div)


    this.create_pokemon_type_section(main_div, pokemon_data)

    //Cria a footer principal e configura ela
    const footer = this.#generate_element("footer", {
      class: "footer_card"
    }, main_div)

    //Cria o botão de mais informações
    const more_info_button = this.#generate_element("button", {
      class: "more_info_btn"
    }, footer)
    more_info_button.innerText = `Mais informações sobre ${pokemon_data.name}`

    // chama o método show_details
    more_info_button.addEventListener("click", () => {
      this.show_details(pokemon_data)
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
   */
  static show_details(pokemon_data) {
    //seleciona a section onde as informações vão ser exibidas
    const info_section = document.getElementById("show-info")

    //cria a div onde vão ser mostradas as informações
    const main_div = this.#generate_element("div", {
      class: "info-card"
    })

    this.create_pokemon_image_section(main_div, pokemon_data)
    this.create_pokemon_stat_section(main_div, pokemon_data)
    this.create_pokemon_abilities_list_seciton(main_div, pokemon_data)

    //insere a div no html
    info_section.replaceChildren(main_div)
  }

  /**
   * 
   * @param {HTMLElement} main_div Div principal onde a section vai ser inserida
   * @param {JSON} pokemon_data Dados do pokemon 
   */

  static create_pokemon_type_section(main_div, pokemon_data) {

    // cria a section dos tipos dos pokemons
    const pokemon_types = this.#generate_element("section", {
      class:"pokemon_types"
    }, main_div)

    const types = pokemon_data.types

    // insere os tipos no html
    types.map((types) => {
      pokemon_types.innerHTML += `<h5 class="type_name" id="${types.type.name}" > ${types.type.name.toUpperCase()} </h5>`
    })

  
  }

  /**
   * 
   * @param {HTMLElement} main_div Div principal onde a section vai ser inserida
   * @param {JSON} pokemon_data Dados do pokemon 
   */
  static create_pokemon_abilities_list_seciton(main_div, pokemon_data) {

    const pokemon_abilities = pokemon_data.abilities

    const abilities_section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria, configura e adiciona o cabeçalho da sections
    const header_abilities = this.#generate_element("header", {
      class: "sub-header-info"
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
    pokemon_abilities.map((ability) => {
      abilities_list.innerHTML += ability.is_hidden ? `<li> ${ability.ability.name}: hidden </li> ` : `<li> ${ability.ability.name}: not hidden </li>`
    })
  }

  /**
   * 
   * @param {HTMLElement} main_div Div principal onde a section vai ser inserida 
   * @param {JSON} pokemon_data Dados do pokemon
   */
  static create_pokemon_stat_section(main_div, pokemon_data) {

    const pokemon_stats = pokemon_data.stats

    const stats_section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria, configura e adiciona o cabeçalho da sections
    const header_stat = this.#generate_element("header", {
      class: "sub-header-info"
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
    pokemon_stats.map((stat) => {
      stat_list.innerHTML += `<li> ${stat.stat.name}: ${stat.base_stat}</li>`
    })
  }


  /**
   * 
   * @param {HTMLElement} main_div Div principal onde a section vai ser inserida
   * @param {JSON} pokemon_data Dados do pokemon 
   */
  static create_pokemon_image_section(main_div, pokemon_data) {

    const pokemon = {
      name: pokemon_data.name,
      sprites: pokemon_data.sprites.other.home.front_default
    }

    const section = this.#generate_element("section", {
      class: "section_info"
    }, main_div)

    //cria o header da div
    const header = this.#generate_element("header", {
      class: "header_info"
    }, section)

    header.innerText = `${pokemon.name.toUpperCase()}`

    //cria o elemento da imagem do pokémon
    const img_section = this.#generate_element("section",{
      class:"img_info"
    }, section)

    const sub_img = this.#generate_element("img", {
      class: "info_sub_img",
      src: pokemon_data.sprites.versions["generation-viii"].icons.front_default,
      alt: pokemon.name
    }, img_section)
    
    const main_img = this.#generate_element("img", {
      class: "info_main_img",
      src: pokemon.sprites,
      alt: pokemon.name
    }, img_section)
    

    //função que vai criar a section dos tipos e inserir no html como filho da section atual
    this.create_pokemon_type_section(section, pokemon_data)

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
