import React from 'react';
import API from '../api';
import LinkStore from '../stores/LinkStore';
console.log('Main');
console.log('LinkStore', LinkStore);
export default class Main extends React.Component {
    componentWillMount() {
    }
    componentDidMount() {
        API.fetchLinks();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h3", null, "Links"),
            React.createElement("ul", null,
                React.createElement("li", null))));
    }
}
