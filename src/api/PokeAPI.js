/**
 * Класс, который предоставляет методы для работы с сервисом https://pokeapi.co/
 * Может получаеть данные об одном покемоне или их произвольном количестве.
 */
export default class PokEAPI {

    /**
     * Получает данные о произвольном количестве покемонов по их id, результат возвращает в виде массива объектов
     * По умолчанию получает первые 10 покемоновю
     * @param {Number} count Количество покемонов
     * @param {Number} startID С какого id начинать
     */
    getPokemons = async (count = 10, startID = 0) => {
        if(startID < 0) startID = 0;
        const temp = await this._fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${ count }&offset=${ startID }`);
        const urls = temp.results.map(({ url }) => url);
        const promises = urls.map(url => this._fetchData(url));
        const pokemons = await Promise.all(promises);
        return pokemons.map(item => {
           return {
               id: +item.id,
               name: item.name,
               image: item["sprites"]["other"]["official-artwork"]["front_default"]
           }
        });
    }

    /**
     * Получает данные о покемоне по его id, возвращает результат в виде объекта.
     * По умолчанию получает первого покемона.
     * @param {Number} id Идентификатор нужного покемона
     * @param {Boolean} full Если true, вернет подробную информацию, false - только id, name, image (для главой страницы)
     * @public
     */
    getPokemon = async (id = 1, full = false) => {
        const pokemon = await this._fetchData(`https://pokeapi.co/api/v2/pokemon/${ id }/`);
        return (full) ? this._formatPokemon(pokemon) : { id: +pokemon.id, name: pokemon.name, image: pokemon["sprites"]["other"]["official-artwork"]["front_default"] }
    }

    /**
     * Отправляет запрос на сервер по указанному адресу и возвращает ответ.
     * @param {String} url Адрес запроса
     * @private
     */
    _fetchData = async url => {
        const response = await fetch(url);
        if(response.ok) {
            return await response.json()
        }
        throw new Error("Ошибка при запросе данных");
    }

    /**
     * Собирает необходимую информацию о покемоне и возвращает в виде объекта.
     * @param {Object} pokemon Исходный объект с данными о покемоне
     * @private
     */
    _formatPokemon = async pokemon => {
        const abilities = await this._collectAbilities(pokemon);
        const locations = await this._collectLocations(pokemon);
        const species   = await this._collectSpecies(pokemon);

        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon["sprites"]["other"]["official-artwork"]["front_default"],
            abilities,
            locations,
            species,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types.map(({ type: { name } }) => name)
        };
    }

    /**
     * Собирает способности покемона в массив объектов вида { название_способности: описание_способности }
     * Имя и описание на английском языке.
     * @param {Object} pokemon Исходный объект с данными о покемоне
     * @private
     */
    _collectAbilities = async pokemon => {
        const promises = pokemon["abilities"]
            .map(({ ability: { url } }) => this._fetchData(url));

        const temp = await Promise.all(promises);
        return temp.reduce((prev, item) => {
            const enText = item["effect_entries"].filter(item => item.language.name === "en")[0].effect;
            prev[item.name] = enText;
            return prev;
        }, {});
    }

    /**
     * Собирает название локаций, в которых встречается данный покемон.
     * @param {Object} pokemon Исходный объект с данными о покемоне
     * @private
     */
    _collectLocations = async pokemon => {
        if(pokemon.id === 150 || (pokemon.id >= 144 && pokemon.id <= 146)) return [ "Нет данных" ];

        const temp = await this._fetchData(pokemon["location_area_encounters"]);
        let locations = temp.map(item => {
            return item["location_area"]["name"];
        });

        if(!locations.length) {
            const temp = await this.getPokemon(pokemon.id - 1, true);
            locations.push(temp.locations);
        }
        return locations;
    }

    /**
     * Собирает данные о виде покемона: эволюция (цепочка и следующий покемон), группа, цвет
     * Возвращаеи их в виде объекта.
     * @param {Object} pokemon Исходный объект с данными о покемоне
     * @private
     */
    _collectSpecies = async pokemon => {
        const baseSpecies = await this._fetchData(pokemon["species"]["url"]);
        const evolution = await this._fetchData(baseSpecies["evolution_chain"]["url"]);

        let chain = evolution["chain"],  next = "Отсутствует";
        const forms = [ evolution["chain"]["species"]["name"] ];

        while(true) {
            if (chain === undefined || !chain["evolves_to"].length || !Object.keys(chain).includes("evolves_to")) break;
            chain = chain["evolves_to"][0];
            forms.push(chain["species"]["name"]);
        }

        for(const [ index, name ] of Object.entries(forms)) {
            if(pokemon.name === name && +index !== forms.length - 1) {
                next = forms[+index + 1];
                break;
            }
        }

        return {
            evolutionChain: {
                forms,
                next
            },
            color: baseSpecies.color.name,
            groups: baseSpecies["egg_groups"].map(({ name }) => name)
        }
    }
}

// const p = new PokEAPI();
//
// p.getPokemons(1, 2).then(res => {
//    console.log(res);
// });
