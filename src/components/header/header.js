import React from "react";
import { ConsumerNav } from "../context";
import "./header.scss";
import Nav from "../nav";

/**
 * Шапка сайта, содержит в себе навигацию.
 * @param props
 * @constructor
 */
const Header = props => {

    return (
        <header className = "main-header">
            <div className = "container">
                <ConsumerNav>
                    {
                        navList => <Nav navList = { navList } />
                    }
                </ConsumerNav>
            </div>
        </header>
    )
}

export default Header;