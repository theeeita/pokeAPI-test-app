import React from "react";

/**
 * Оборачивает указанный React компонент в div с указанным классом. Возвращает обёртку как React компонент.
 * @param Element React-компонент
 * @param {String} className Имя класса для элемента обёртки.
 */
const addWrapperClass = (Element, className) => {
    return props => {
        return (
            <div className = { className }>
                <Element { ...props } />
            </div>
        )
    }
}

export default addWrapperClass;