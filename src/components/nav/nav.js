import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

/**
 * Навигация сайта
 * @param navList
 * @constructor
 */
const Nav = ({ navList }) => {

    /**
     * Создает jsx-разметку навигации в виде ul => li => a
     * @param {Array} list Массив ссылок в виде объектов { url, text }
     * @private
     */
    const _createMenu = list => {
        const baseID = Math.ceil( Math.random() * 10),
              items = list.map(({ url, text }, index) => {
                return (
                    <li key = { (baseID * index) + 1 }
                        className = "main-menu__item">
                        <Link to = { `${ url }` }>{ text }</Link>
                    </li>
                )
              });
        return <ul>{ items }</ul>
    }

    return (
        <nav className = "main-menu">
            { (navList) ? _createMenu(navList) : null }
        </nav>
    )
}

export default Nav;