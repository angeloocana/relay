import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
class Link extends React.Component {
    constructor() {
        super(...arguments);
        this.dateStyle = () => ({
            color: '#888',
            fontSize: '0.7em',
            marginRight: '0.5em'
        });
        this.dateLabel = () => {
            let { link, relay } = this.props;
            if (relay.hasOptimisticUpdate(link)) {
                return 'Saving...';
            }
            return moment(link.createdAt).format('L');
        };
    }
    render() {
        let { link } = this.props;
        return (React.createElement("li", null,
            React.createElement("span", { style: this.dateStyle() }, this.dateLabel()),
            React.createElement("a", { href: link.url }, link.title)));
    }
}
Link = Relay.createContainer(Link, {
    fragments: {
        link: () => Relay.QL `
            fragment on Link {
                url,
                title
            }
        `
    }
});
export default Link;
