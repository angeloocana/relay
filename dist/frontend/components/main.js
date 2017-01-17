import React from 'react';
import API from '../api';
import LinkStore from '../stores/LinkStore';
console.log('Main');
console.log('LinkStore', LinkStore);
var _getAppState = () => {
    return { links: LinkStore.getAll() };
};
export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.state = _getAppState();
        this.onChange = () => {
            console.log('4. in View');
            this.setState(_getAppState());
        };
    }
    componentWillMount() {
    }
    componentWillUnmount() {
        LinkStore.removeListener('change', this.onChange);
    }
    componentDidMount() {
        API.fetchLinks();
        LinkStore.on('change', this.onChange);
    }
    render() {
        var content = this.state.links.slice(0, this.props.limit).map(link => {
            return React.createElement("li", { key: link._id },
                React.createElement("a", { href: link.url }, link.title));
        });
        return (React.createElement("div", null,
            React.createElement("h3", null, "Links"),
            React.createElement("ul", null, content)));
    }
}
Main.propTypes = {
    limit: React.PropTypes.number
};
Main.defaultProps = {
    limit: 4
};
