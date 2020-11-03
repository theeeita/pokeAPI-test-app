import React, { Component } from "react";
import { NotFoundPage } from "../pages";

/**
 * Оборачивает React компонент в компонент класс, который получает данные с сервера и
 * передает исходному компоненту эти данные в виде свойства data
 * @param Element React-компонент, который надо обернуть.
 * @param {Function} getData функция, которая получает данные с сервера
 * @param args Аргументы для getData
 */
const setData = (Element, getData, ...args) => {
    return class extends Component {
        state = {
            data: null,
            error: false,
        }

        componentDidMount() {
            getData(...args).then(data => {
                this.setState({ data });
            }).catch(err => {
               this.setState({ error: true })
            });
        }

        render() {

            const { data, error } = this.state;

            if(error) return <NotFoundPage />;

            return (data) ? <Element data = { data } { ...this.props } /> : null;
        }

    }
}

export default setData;