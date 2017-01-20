import React from 'react';
import Relay from 'react-relay';

import Link from './Link';

class Main extends React.Component<any, any>{
 
    /* props validation example
    static propTypes = {
        limit: React.PropTypes.number
    }

    static defaultProps = {
        limit: 4    
    }
    */

    setLimit = (e) => {
        var newLimit = Number(e.target.value);
        this.props.relay.setVariables({limit: newLimit});
        console.log('newLimit', newLimit);
        console.log('relay', this.props.relay);
    }

	render(){
		var content = this.props.store.linkConnection.edges.map(edge => {
			return <Link key={edge.node.id} link={edge.node} />;
		});

		return (<div>
			<h3>Links</h3>
            <label htmlFor='pagination-limit'>Showing</label>
            <select id='pagination-limit' onChange={this.setLimit}>
                <option value="10">10</option>
                <option value="20" selected>20</option>
            </select>
			<ul>
				{content}
			</ul>
			</div>);			        
	}
}

Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 20
    },
    fragments: {
       store: () => Relay.QL`
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
