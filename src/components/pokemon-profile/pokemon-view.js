import React from "react";

/**
 * Компонент, который отрисовывает информацию о покемоне.
 * @param {Object} data Объект с подробными данными о покемоне.
 * @constructor
 */
const PokemonView = ({ data }) => {
    const {
        name,
        image,
        abilities,
        locations,
        species,
        height,
        weight,
        types
    } = data;

    /**
     * Возвращает массив элементов li со способностями покемона и их описанием.
     * @param {Object} collection Объект вида { имя_способности, описание_способности }
     * @private
     */
    const _printAbilities = collection => {
        const result = [];
        for(const [ name, description ] of Object.entries(collection)) {
            const temp = (
                <li key = { name }>
                    <span className = "prop-name">{ name }:</span>
                    <span className = "prop-description">{ description }</span>
                </li>
            );
            result.push(temp);
        }
        return result;
    }


    return (
        <div className = "pokemon-profile">
            <div className = "pokemon-profile__header">
                <h2 style = { { color: species.color } } className = "pokemon-profile__name">{ name }</h2>
                <div className = "pokemon-profile__image">
                    <img
                        src   = { image }
                        alt   = { name }
                        title = { name }/>
                </div>
            </div>
            <div className = "pokemon-profile__info">
                <div className = "pokemon-profile__info-group">
                    <h3>Общие харатеристики:</h3>
                    <ul>
                        <li>
                            <span className = "prop-name">Тип:</span>
                            <span className = "prop-description">{ types.join(", ") }.</span>
                        </li>
                        <li>
                            <span className = "prop-name">Группы:</span>
                            <span className = "prop-description">{ species.groups.join(", ") }.</span>
                        </li>
                        <li>
                            <span className = "prop-name">Места обитания:</span>
                            <span className = "prop-description">{ locations.join(", ") }.</span>
                        </li>
                    </ul>
                </div>
                <div className = "pokemon-profile__info-group">
                    <h3>Физические характеристики:</h3>
                    <ul>
                        <li>
                            <span className = "prop-name">Рост:</span>
                            <span className = "prop-description">{ height }</span>
                        </li>
                        <li>
                            <span className = "prop-name">Вес:</span>
                            <span className = "prop-description">{ weight }</span>
                        </li>
                        <li>
                            <span className = "prop-name">Цвет:</span>
                            <span className = "prop-description">{ species.color }</span>
                        </li>
                    </ul>
                </div>
                <div className = "pokemon-profile__info-group">
                    <h3>Эволюция:</h3>
                    <ul>
                        <li>
                            <span className = "prop-name">Эволюционирует в:</span>
                            <span className = "prop-description">{ species.evolutionChain.next }</span>
                        </li>
                        <li>
                            <span className = "prop-name">Вся цепочка эволюции:</span>
                            <span className = "prop-description">{ species.evolutionChain.forms.join(" → ") }</span>
                        </li>
                    </ul>
                </div>
                <div className = "pokemon-profile__info-group">
                    <h3>Способности:</h3>
                    <ul>{ _printAbilities(abilities) }</ul>
                </div>
            </div>
        </div>
    )
}

export default PokemonView;