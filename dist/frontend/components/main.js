import React from 'react';
import Relay from 'react-relay';
import { debounce } from 'lodash';
import Link from './Link';
import CreateLinkMutation from "../mutations/CreateLinkMutation";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this._searchTask = (e) => {
            let query = e.target.value;
            this.props.relay.setVariables({ query });
        };
        this.search = (e) => {
            e.persist();
            this._searchTask(e);
        };
        this.setLimit = (e) => {
            var newLimit = Number(e.target.value);
            this.props.relay.setVariables({ limit: newLimit });
            console.log('newLimit', newLimit);
            console.log('relay', this.props.relay);
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            Relay.Store.update(new CreateLinkMutation({
                title: this.refs.newTitle.value,
                url: this.refs.newUrl.value,
                store: this.props.store
            }));
            this.refs.newTitle.value = "";
            this.refs.newUrl.value = "";
        };
        this._searchTask = debounce(this._searchTask, 300);
    }
    render() {
        var content = this.props.store.linkConnection.edges.map(edge => {
            return React.createElement(Link, { key: edge.node.id, link: edge.node });
        });
        return (React.createElement("div", null,
            React.createElement("h3", null, "Links"),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", placeholder: "Title", ref: "newTitle" }),
                React.createElement("input", { type: "text", placeholder: "Url", ref: "newUrl" }),
                React.createElement("button", { type: "submit" }, "Add")),
            React.createElement("label", { htmlFor: 'pagination-limit' }, "Showing"),
            React.createElement("input", { type: "text", placeholder: "Search", onChange: this.search }),
            React.createElement("select", { id: 'pagination-limit', onChange: this.setLimit, defaultValue: this.props.relay.variables.limit },
                React.createElement("option", { value: "10" }, "10"),
                React.createElement("option", { value: "20" }, "20")),
            React.createElement("ul", null, content)));
    }
}
Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 20,
        query: ''
    },
    fragments: {
        store: () => Relay.QL `
        fragment on Store{
            id,
            linkConnection(first: $limit, query: $query){
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
