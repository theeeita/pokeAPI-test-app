import React from "react";
import { Link } from "react-router-dom";
import { ConsumerAPI } from "../context";
import PokemonList from "../pokemon-list";
import "./sidebar.scss";

/**
 * Сайдбар (боковая колонка) со списком покемонов
 * @param props
 * @constructor
 */
const Sidebar = props => {

    const render = ({ id, name }) => (
        <Link to = { `/pokemon/${ id }` }>
            { name }
        </Link>
    )

    return (
        <aside className = "sidebar">
            <ConsumerAPI>
                {
                    ({ getPokemons }) => <PokemonList { ...props } render = { render } getData = { getPokemons } />
                }
            </ConsumerAPI>
        </aside>
    )
}

export default Sidebar;