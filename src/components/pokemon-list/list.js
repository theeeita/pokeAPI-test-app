import React from "react";

/**
 * Список покемонов
 * @param {Array} data Массив объектов с данными о покемонах
 * @param {Function} render Функция, которая решает, как отобразить данные о покемонах
 * @constructor
 */
const List = ({ data, render }) => {
    return (
        <div className = "pokemon-list">
            <ul>
                { data.map(item => {
                    return (
                        <li key = { item.id }
                            className = { "pokemon-list__item" }>
                            { render(item) }
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default List;