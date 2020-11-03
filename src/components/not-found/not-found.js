import React from "react";
import "./not-found.scss";

/**
 * Компонент, который отвечает за отображение страницы 404
 * @param props
 * @constructor
 */
const NotFound = props => {
    return (
        <div className = "not-found">
            <h2 className = "not-found__title">Страница не найдена!</h2>
            <p className = "not-found__message">Чтобы мир спасти от разрушения...</p>
            <div className="not-found__image">

            </div>
        </div>
    )
}

export default NotFound;