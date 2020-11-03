import React from "react";
import { Link } from "react-router-dom";
import { ConsumerAPI } from "../context";
import PokemonList from "../pokemon-list";
import PokemonCard from "../pokemon-card";
import "./pokemon-cards-list.scss";

/**
 * Список карточек покемонов для главной страницы сайта.
 * @constructor
 */
const PokemonCardsList = props => {
    const render = ({ id, name, image }) => {
        return (
            <Link to = { `/pokemon/${ id }` }>
                <PokemonCard pokemonID = { id } name = { name } image = { image } />
            </Link>
        )
    }

    return (
        <div className = "pokemon-cards-list" >
            <div className = "container">
                <ConsumerAPI>
                    {
                        ({ getPokemons }) => {
                            return <PokemonList { ...props } getData = { getPokemons } render = { render } />
                        }

                    }
                </ConsumerAPI>
            </div>
        </div>
    )
}

export default PokemonCardsList;