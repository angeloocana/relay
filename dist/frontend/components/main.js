import React from 'react';
import Relay from 'react-relay';
class Main extends React.Component {
    render() {
        var content = this.props.store.links.slice(0, this.props.limit).map(link => {
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
Main = Relay.createContainer(Main, {
    fragments: {
        store: () => Relay.QL `
        fragment on Store{
            links{
                _id,
                title,
                url
            }
        }
       `
    }
});
export default Main;
