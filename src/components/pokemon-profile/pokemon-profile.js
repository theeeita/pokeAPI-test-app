import React from "react";
import { setData } from "../hoc";
import { ConsumerAPI } from "../context";
import PokemonView from "./pokemon-view";
import "./pokemon-profile.scss";

/**
 * Компонент - карточка с подробной информацией о покемоне.
 * Обёртка, которая получает данные с сервера и передает их компоненту PokemonView.
 *
 * @param {Number} pokemonID id нужного покемона
 * @constructor
 */
const PokemonProfile = ({ pokemonID }) => {
    return (
        <ConsumerAPI>
            {
                ({ getPokemon }) => {
                    const Profile = setData(PokemonView, getPokemon, pokemonID, true);
                    return <Profile />
                }
            }
        </ConsumerAPI>
    )
}

export default PokemonProfile;