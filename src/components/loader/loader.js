import React from "react";
import "./loader.scss";

/**
 * Компонент, который отображается пока данные не загрузились.
 * @constructor
 */
const Loader = props => {
	return (
		<div className = "loader">
				<h3>Покемоны грузятся...</h3>
				<div className = "loader__image"></div>
		</div>
	)
}

export default Loader;