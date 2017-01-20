import React from 'react';
import Relay from 'react-relay';
import Link from './Link';
class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.setLimit = (e) => {
            var newLimit = Number(e.target.value);
            this.props.relay.setVariables({ limit: newLimit });
            console.log('newLimit', newLimit);
            console.log('relay', this.props.relay);
        };
    }
    render() {
        var content = this.props.store.linkConnection.edges.map(edge => {
            return React.createElement(Link, { key: edge.node.id, link: edge.node });
        });
        return (React.createElement("div", null,
            React.createElement("h3", null, "Links"),
            React.createElement("label", { htmlFor: 'pagination-limit' }, "Showing"),
            React.createElement("select", { id: 'pagination-limit', onChange: this.setLimit },
                React.createElement("option", { value: "10" }, "10"),
                React.createElement("option", { value: "20", selected: true }, "20")),
            React.createElement("ul", null, content)));
    }
}
Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 20
    },
    fragments: {
        store: () => Relay.QL `
        fragment on Store{
            linkConnection(first: $limit){
                edges{
                    node{
                        id,
                        ${Link.getFragment('link')}                
                    }
                }
            }
        }
       `
    }
});
export default Main;
