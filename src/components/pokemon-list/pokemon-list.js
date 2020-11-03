import React from "react";
import { setData } from "../hoc";
import List from "./list";
import "./pokemon-list.scss";

/**
 * Список покемонов.
 * Обёртка для компонента списка, которая получает данные с сервера и передет компоненту List.
 *
 * @param {Number} start id покемона, с которого начинать получать покемонов
 * @param {Number} count Сколько покемонов надо получить
 * @param {Function} render Функция, которая решает, как отрисовать элементы списка покемонов
 * @param {Function} getData Функция, которая получает данные с сервера
 * @constructor
 */
const PokemonList = ({ start, count, render, getData }) => {
    const CardsWithData = setData(List, getData, count, start);
    return <CardsWithData render = { render } />
}

export default PokemonList;