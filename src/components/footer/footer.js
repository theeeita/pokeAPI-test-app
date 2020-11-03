import React from "react";
import "./footer.scss";

/**
 * Футер (подвал) сайта
 * @param props
 * @constructor
 */
const Footer = props => {

    /**
     * Возвращает текущую дату в формате dd.mm.yyyy
     * @return {string}
     */
    const getCurrentDate = () => {
        const now   = new Date(),
              day   = now.getDate(),
              month = now.getMonth();
        return `${ (day < 10) ? "0" + day : day }.${ ((month + 1) < 10) ? "0" + month : month }.${ now.getFullYear() }`;
    }

    return (
        <footer className = "main-footer">
            <div className = "container">
                <div className = "main-footer__content">
                    <p>{ getCurrentDate() }</p>
                    <p>Покемон, оу-у-у, приятель мой...</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
