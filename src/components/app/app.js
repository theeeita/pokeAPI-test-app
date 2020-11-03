// Служебные компоненты, api, стили:
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProviderAPI, ProviderNav } from "../context";
import PokeAPI from "../../api/PokeAPI";
import "./app.scss";

// Компоненты приложения:
import Header from "../header";
import Footer from "../footer";

// Страницы:
import {
    FrontPage,
    PagePokemonList,
    NotFoundPage,
    PageProfile
} from "../pages";


/**
 * Главный компонент приложения, который хранит в себе основную информацию о сайте:
 * список ссылок для навигации, api для работы с сервером, какие страницы отображать,
 * и инструкции о том, данные о скольких покемонах надо запросить.
 */
export default class App extends Component {

    api = new PokeAPI();

    state = {
        data: {
            start: 0,
            count: 150, // 150
        },
        navList: [
            { url: "/", text: "Главная" },
            { url: "/pokemon-list", text: "Список покемонов" }
        ]
    }


    render() {

        const { data, navList } = this.state;

        return (
            <Router>
                <ProviderAPI value = { this.api }>
                    <ProviderNav value = { navList }>
                        <div className = "app">
                            <Header />

                            <Switch>
                                <Route
                                    path = { "/" }
                                    exact
                                    render = { () => <FrontPage { ...data } /> }
                                    />
                                <Route
                                    path = { "/pokemon/:id" }
                                    exact
                                    render = {
                                        ({ match }) => <PageProfile pokemonID = { +match.params.id  } />
                                    }
                                />
                                <Route
                                    path = { "/pokemon-list" }
                                    exact
                                    render = { () => <PagePokemonList { ...data } /> } />
                                <Route render = { () => <NotFoundPage /> } />
                            </Switch>

                            <Footer />
                        </div>
                    </ProviderNav>
                </ProviderAPI>
            </Router>
        )
    }
}