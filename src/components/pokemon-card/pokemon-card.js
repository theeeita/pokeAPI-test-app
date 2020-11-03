import React from "react";
import "./pokemon-card.scss";

/**
 * Карточка покемона на главной странице, которая отображает имя, картику покемона.
 * @param {Number} pokemonID id нужного покемона
 * @constructor
 */
const PokemonCard  = ({ image, name }) => {

    return(
        <div className = "pokemon-card">
            <div className = "pokemon-card__view">
                <h2 className = "pokemon-card__title">{ name }</h2>
                <img className = "pokemon-card__image"
                     src = { image }
                     alt = { name }/>
            </div>
        </div>
    )
}

export default PokemonCard;